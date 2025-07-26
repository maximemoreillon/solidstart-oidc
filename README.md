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
import { middleware } from "@solidjs/start/config";
export default middleware;
```

#### Route handlers

`src/routes/api/oauth/login.ts`

```ts
import { loginHandler } from "@moreillon/solidstart-oidc";
export const GET = loginHandler;
```

`src/routes/api/oauth/callback.ts`

```ts
import { callbackHandler } from "@moreillon/solidstart-oidc";
export const GET = callbackHandler;
```

#### Environment variables

```.env
AUTH_SESSION_SECRET=areallylongsecretthatyoushouldreplace
OIDC_AUTHORITY=https://oidc.example.com
OIDC_CLIENT_ID=yourclientid
```
