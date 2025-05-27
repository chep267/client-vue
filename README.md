# Chep Vue

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Config `.env`

In this project, you need to create a `.env` file in the root directory to configure the following environment variables:

- **VITE_APP_TITLE**: The title displayed in the browser tab.
- **VITE_APP_NAME**: The name of the application.
- **VITE_APP_MODE**: The operating mode (`dev`, `prod`, etc.).

####

- **VITE_APP_CLIENT_HOST**: The server host (e.g., `localhost`).
- **VITE_APP_CLIENT_PORT**: The port on which the application runs.
- **VITE_APP_CLIENT_LOCALE**: The default language (`en`, `vi`, etc.).
- **VITE_APP_CLIENT_THEME**: The theme of the application (`light` or `dark`).

####

- **VITE_APP_API_HOST**: The base URL for your API.
- **VITE_APP_ACCESS_KEY**: The access key for external services or CDN.

## Project Setup

```sh
  pnpm install
```

### Compile and Hot-Reload for Development

```sh
  pnpm dev
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
  pnpm test:unit
```

### Format code with Prettier

```sh
  pnpm format
```

### Lint with [ESLint](https://eslint.org/)

```sh
  pnpm lint
```

### Type-Check, Compile and Minify for Production

```sh
  pnpm build
```

### Preview build app

```sh
  pnpm preview
```
