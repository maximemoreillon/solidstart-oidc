# SolidStart OIDC

A simple package to enable OIDC / Oauth authentication in SolidStart. Tested with Auth0.

## Usage

### Installation

```
npm i @moreillon/solidstart-oidc
```

### Setup

#### Middleware

Create a middleware file `src/middleware/oidc.ts` with the following content:

```ts
import { createMiddleware } from "@solidjs/start/middleware";
import { requireLogin } from "@moreillon/solidstart-oidc";
import { type FetchEvent } from "@solidjs/start/server";
import { redirect } from "@solidjs/router";

export default createMiddleware({
  async onRequest(event: FetchEvent) {
    const url = await requireLogin(event);
    if (url) return redirect(url);
  },
});
```

Register the middleware in `app.config.ts`

```ts
import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
  middleware: "./src/middleware/oidc.ts",
});
```

#### Route handlers

`src/routes/api/oauth/login.ts`

```ts
import { loginHandler } from "@moreillon/solidstart-oidc";
import { redirect } from "@solidjs/router";
import type { APIEvent } from "@solidjs/start/server";

export async function GET(event: APIEvent) {
  const href = await loginHandler(event);
  return redirect(href);
}
```

`src/routes/api/oauth/callback.ts`

```ts
import { callbackHandler } from "@moreillon/solidstart-oidc";
import { redirect } from "@solidjs/router";
import type { APIEvent } from "@solidjs/start/server";

export async function GET(event: APIEvent) {
  await callbackHandler(event);
  return redirect("/");
}
```

#### Environment variables

```.env
AUTH_SESSION_SECRET=areallylongsecretthatyoushouldreplace
OIDC_AUTHORITY=https://oidc.example.com
OIDC_CLIENT_ID=yourclientid
```
