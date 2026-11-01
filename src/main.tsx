import { StrictMode } from "react";
import { hydrateRoot, createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { RouterClient } from "@tanstack/react-router/ssr/client";
import { getRouter } from "./router";
import "./styles.css";

const router = getRouter();
const root = document.getElementById("root")!;
const hasPrerenderedContent = root.childElementCount > 0;
if (!hasPrerenderedContent) await router.load();

const app = (
  <StrictMode>
    {hasPrerenderedContent ? <RouterClient router={router} /> : <RouterProvider router={router} />}
  </StrictMode>
);
if (hasPrerenderedContent) hydrateRoot(root, app);
else createRoot(root).render(app);
document.documentElement.classList.add("js");
