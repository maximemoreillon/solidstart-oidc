import { type FetchEvent } from "@solidjs/start/server";
import { redirect } from "@solidjs/router";
import { useUserSession } from "./session.js";

export async function requireLogin(event: FetchEvent) {
  const { pathname } = new URL(event.request.url);

  if (pathname === "/api/oauth/callback") return;

  if (pathname === "/api/oauth/login") return;

  const userSession = await useUserSession();
  if (!userSession.data?.user) return redirect("/api/oauth/login");
}
