import { createMiddleware } from "@solidjs/start/middleware";
import { requireLogin } from "../../../src";

export default createMiddleware({
  onRequest: requireLogin,
});
