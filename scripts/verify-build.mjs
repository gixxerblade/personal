import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, stat } from "node:fs/promises";
import { resolve } from "node:path";

const output = resolve("dist");
const html = await readFile(resolve(output, "index.html"), "utf8");
const headers = await readFile(resolve(output, "_headers"), "utf8");
const heading = html
  .match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1]
  .replace(/<[^>]*>/g, "")
  .trim();
assert(heading, "The main heading must be rendered in the delivered HTML.");
assert(
  !html.includes("<!--app-html-->"),
  "The server-rendered content placeholder must be replaced.",
);
assert(html.includes("$_TSR"), "TanStack bootstrap data must accompany the rendered route tree.");
assert(!headers.includes("__INLINE_SCRIPT_HASHES__"), "CSP must contain resolved hashes.");
assert(
  !headers.includes("'unsafe-inline'"),
  "The production policy must not allow arbitrary inline script.",
);

for (const file of ["index.html", "404.html"]) {
  const document = await readFile(resolve(output, file), "utf8");
  for (const [, path] of document.matchAll(/(?:href|src)="(\/(?!\/)[^"?#]*)(?:[?#][^"]*)?"/g)) {
    if (path !== "/")
      assert((await stat(resolve(output, `.${path}`))).isFile(), `${file}: missing ${path}`);
  }
  for (const [, script] of document.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)) {
    if (!script) continue;
    const hash = createHash("sha256").update(script).digest("base64");
    assert(
      headers.includes(`'sha256-${hash}'`),
      `${file}: inline script is not permitted by the content security policy.`,
    );
  }
}
const anchors = new Set([...html.matchAll(/id="([^"]+)"/g)].map((match) => match[1]));
for (const [, id] of html.matchAll(/href="\/?#([^"]+)"/g))
  assert(anchors.has(id), `Missing anchor #${id}`);
assert((await readFile(resolve(output, "404.html"), "utf8")).includes("noindex"));
console.log("Verified prerendered content, local assets, anchors, 404, and production CSP.");
