import { type FetchEvent } from "@solidjs/start/server";

import { useUserSession } from "./session.js";

// Causes Error when evaluating SSR module $vinxi/handler/ssr: Client-only API called on the server side. Run client-only code in onMount, or conditionally run client-only component with <Show>.
// import { redirect } from "@solidjs/router";

export async function requireLogin(event: FetchEvent) {
  const { pathname } = new URL(event.request.url);

  if (pathname === "/api/oauth/callback") return;

  if (pathname === "/api/oauth/login") return;

  const userSession = await useUserSession();
  if (userSession.data?.user) return;

  // TODO: could think of sending users straight to OIDC provider
  return "/api/oauth/login";

  // PROBLEM: having redirect here causes  Error when evaluating SSR module $vinxi/handler/ssr: Client-only API called on the server side. Run client-only code in onMount, or conditionally run client-only component with <Show>.
  // return redirect("/api/oauth/login");
}
