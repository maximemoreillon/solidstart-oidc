import { z } from "zod";

const envSchema = z.object({
  OIDC_SESSION_SECRET: z.string(),
  OIDC_AUTHORITY: z.string(),
  OIDC_CLIENT_ID: z.string(),
  OIDC_COOKIES_INSECURE: z.string().optional(),
});

export const {
  OIDC_SESSION_SECRET,
  OIDC_AUTHORITY,
  OIDC_CLIENT_ID,
  OIDC_COOKIES_INSECURE,
} = envSchema.parse(process.env);
