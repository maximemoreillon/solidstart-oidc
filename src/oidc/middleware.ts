import { createMiddleware } from "@solidjs/start/middleware";
import { useUserSession } from ".";
import { redirect } from "@solidjs/router";

export default createMiddleware({
  onRequest: async (event) => {
    const { pathname } = new URL(event.request.url);

    if (pathname === "/api/oauth/callback") return;

    if (pathname === "/api/oauth/login") return;

    const userSession = await useUserSession();
    if (!userSession.data?.user) return redirect("/api/oauth/login");
  },
});
