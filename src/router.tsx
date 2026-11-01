import {
  createRootRoute,
  createRoute,
  createRouter,
  createMemoryHistory,
  Outlet,
  Link,
  Scripts,
} from "@tanstack/react-router";
import { App } from "./App";

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Scripts />
    </>
  ),
  notFoundComponent: () => (
    <main className="not-found wrap">
      <p className="eyebrow">404 / PAGE NOT FOUND</p>
      <h1>
        Back to
        <br />
        solid ground.
      </h1>
      <Link to="/" className="button">
        Back to the portfolio
      </Link>
    </main>
  ),
});
const indexRoute = createRoute({ getParentRoute: () => rootRoute, path: "/", component: App });
const routeTree = rootRoute.addChildren([indexRoute]);

export function getRouter(serverUrl?: string) {
  return createRouter({
    routeTree,
    history: serverUrl ? createMemoryHistory({ initialEntries: [serverUrl] }) : undefined,
    scrollRestoration: true,
  });
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
