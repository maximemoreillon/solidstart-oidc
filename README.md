# SolidStart OIDC

A simple package to enable OIDC / Oauth authentication in SolidStart. Tested with Auth0.

## Usage

### Installation

```
npm i @moreillon/solidstart-oidc
```

### Setup

#### Middleare

Create a middleware file `src/middleware/index.ts` in `src` with the following content:

```ts
import { createMiddleware } from "@solidjs/start/middleware";
import { onRequest } from "@moreillon/solidstart-oidc";

export default createMiddleware({ onRequest });
```

Register the middleware in `app.config.ts`

```ts
import { createMiddleware } from "@solidjs/start/middleware";
import { requireLogin } from "@moreillon/solidstart-oidc";
import { type FetchEvent } from "@solidjs/start/server";
import { redirect } from "@solidjs/router";

export default createMiddleware({
  async onRequest(event: FetchEvent) {
    const url = await requireLogin(event);
    if (url) redirect(url);
  },
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
