<!--
Get your module up and running quickly.

Find and replace all on all files (CMD+SHIFT+F):
- Name: My Module
- Package name: my-module
- Description: My new Nuxt module
-->

# Rubberduck

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

My new Nuxt module integrated with the [Nuxt Devtools](https://github.com/nuxt/devtools).

## Quick Setup

1. Add `nuxt-devtools-rubberduck` dependency to your project

```bash
# Using pnpm
pnpm add -D nuxt-devtools-rubberduck

# Using yarn
yarn add --dev nuxt-devtools-rubberduck

# Using npm
npm install --save-dev nuxt-devtools-rubberduck
```

2. Add `nuxt-devtools-rubberduck` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: [
    'nuxt-devtools-rubberduck'
  ]
})
```

That's it! You can now use the duck in your Nuxt app ✨

## Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with playground, with devtools client ui
npm run dev

# Develop with playground, with bundled client ui
npm run play:prod

# Run ESLint
npm run lint

# Run Vitest
npm run test
npm run test:watch

# Release new version
npm run release
```

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-devtools-rubberduck/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/nuxt-devtools-rubberduck

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-devtools-rubberduck.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/nuxt-devtools-rubberduck

[license-src]: https://img.shields.io/npm/l/nuxt-devtools-rubberduck.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/nuxt-devtools-rubberduck

