import { redirect } from "@solidjs/router";
import { useUserSession } from "./session";
import { FetchEvent } from "@solidjs/start/server";
import { createMiddleware } from "@solidjs/start/middleware";

export async function onRequest(event: FetchEvent) {
  const { pathname } = new URL(event.request.url);

  if (pathname === "/api/oauth/callback") return;

  if (pathname === "/api/oauth/login") return;

  const userSession = await useUserSession();
  if (!userSession.data?.user) return redirect("/api/oauth/login");
}

export default createMiddleware({
  onRequest,
});
