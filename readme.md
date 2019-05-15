# UI + API Setup Sample

This is a experimental opinionated setup template for React web application alongside with NodeJS API server.

Stack:
* React + React Router
* Jest
* Webpack (no babel) + Typescript + CSS (no preprocessors configured)
* Fastify

Development API server and static web-server are launched as a single process with just `npm start`.
Files are watched, so dev server reloads when change is detected. But automatic browser refresh is not supported for now.

Setup uses [fastify](https://github.com/fastify/fastify) as NodeJS framework, although it should be fairly straigh-forward to use another Express-like framework.

## File Structure

```

src\
├── api\                  -- All API routes go here
|   └── sample\           -- Some API route
|       ├── index.ts      -- Client code
|       ├── contract.ts   -- Shared types definitions, constants, etc.
|       └── handler.ts    -- Server code
├── components\           -- React Components (Representational Components)
├── containers\           -- React Containers (Orchestration Component)
├── server\               -- Server bootstrap code
├── shared\               -- Code shared between client and server
├── static\               -- Static assets like pictures, icons, etc.
├── index.html            -- Basic application markup
├── index.css             -- Global CSS file, components may import their own CSS files
├── index.tsx             -- UI bootstrap code
└── router.tsx            -- Global React router configuration
```