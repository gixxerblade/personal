import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { basename, resolve } from "node:path";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { RouterProvider } from "@tanstack/react-router";
import {
  attachRouterServerSsrUtils,
  transformHtmlStringWithRouter,
} from "@tanstack/react-router/ssr/server";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { getRouter } from "./src/router";

export default defineConfig(() => {
  const inlineScriptHashes = new Set<string>();

  return {
    appType: "mpa",
    plugins: [
      react(),
      {
        name: "portfolio-static-html",
        apply: "build",
        transformIndexHtml: {
          order: "post",
          async handler(html, context) {
            if (basename(context.filename) !== "index.html") return html;
            const router = getRouter("/");
            attachRouterServerSsrUtils({ router, manifest: undefined });
            await router.load();
            await router.serverSsr!.dehydrate();
            const markup = renderToString(createElement(RouterProvider, { router }));
            const document = await transformHtmlStringWithRouter(
              router,
              html.replace(/^<!doctype html>/i, "").replace("<!--app-html-->", markup),
            );
            // TanStack's bootstrap and scroll-restoration scripts run before hydration. Allow
            // this exact build output without enabling arbitrary inline scripts.
            for (const match of document.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)) {
              if (match[1]) {
                inlineScriptHashes.add(
                  `'sha256-${createHash("sha256").update(match[1]).digest("base64")}'`,
                );
              }
            }
            return document;
          },
        },
        async writeBundle(output) {
          const template = await readFile(resolve("public/_headers"), "utf8");
          await writeFile(
            resolve(output.dir ?? "dist", "_headers"),
            template.replace("__INLINE_SCRIPT_HASHES__", [...inlineScriptHashes].join(" ")),
          );
        },
      },
      {
        name: "netlify-preview",
        configurePreviewServer(server) {
          const output = resolve(server.config.root, server.config.build.outDir);
          server.middlewares.use(async (req, res, next) => {
            try {
              // Read the built rules on each request so a rebuild cannot leave stale CSP hashes.
              const [headers, redirectRules] = await Promise.all([
                readFile(resolve(output, "_headers"), "utf8"),
                readFile(resolve(output, "_redirects"), "utf8"),
              ]);
              const url = new URL(req.url ?? "/", "http://localhost");
              let applies = false;
              for (const line of headers.split("\n")) {
                if (!line.trim()) continue;
                if (!/^\s/.test(line)) {
                  applies = line.endsWith("*")
                    ? url.pathname.startsWith(line.slice(0, -1))
                    : url.pathname === line;
                } else if (applies) {
                  const match = line.match(/^\s+([\w-]+): (.+)$/);
                  if (match) res.setHeader(match[1], match[2]);
                }
              }
              const redirect = redirectRules
                .split("\n")
                .map((line) => line.trim().split(/\s+/))
                .find(([from]) => from === url.pathname);
              if (redirect) {
                res.writeHead(Number(redirect[2]), { Location: redirect[1] });
                res.end();
                return;
              }
              if (url.pathname === "/") req.url = `/index.html${url.search}`;
              next();
            } catch (error) {
              next(error);
            }
          });
          return () =>
            server.middlewares.use(async (_req, res, next) => {
              try {
                const html = await readFile(resolve(output, "404.html"), "utf8");
                res.statusCode = 404;
                res.setHeader("Content-Type", "text/html; charset=utf-8");
                res.end(html);
              } catch (error) {
                next(error);
              }
            });
        },
      },
    ],
    build: {
      target: "es2022",
      rollupOptions: { input: { main: resolve("index.html"), notFound: resolve("404.html") } },
    },
  };
});
