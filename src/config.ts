import { z } from "zod";

const envSchema = z.object({
  AUTH_SESSION_SECRET: z.string(),
  OIDC_AUTHORITY: z.string(),
  OIDC_CLIENT_ID: z.string(),
  NODE_ENV: z.string(),
});

export const { AUTH_SESSION_SECRET, OIDC_AUTHORITY, OIDC_CLIENT_ID, NODE_ENV } =
  envSchema.parse(process.env);
