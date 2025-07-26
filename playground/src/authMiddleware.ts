import { createMiddleware } from "@solidjs/start/middleware";
import { onRequest } from "../../src";

export default createMiddleware({
  onRequest,
});
