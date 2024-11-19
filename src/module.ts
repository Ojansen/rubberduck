import { defineNuxtModule, addPlugin, createResolver, addServerHandler } from '@nuxt/kit'
import { setupDevToolsUI } from './devtools'

// Module options TypeScript interface definition
export interface ModuleOptions {
  /**
   * Enable Nuxt Devtools integration
   *
   * @default true
   */
  devtools: boolean

  llm: 'ollama' | 'openai'

  modelName: string

  systemMessage: string

  OpenAiApiKey: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'Rubberduck',
    configKey: 'duck',
  },
  // Default configuration options of the Nuxt module
  defaults: {
    devtools: true,
    llm: 'ollama',
    modelName: 'llama3.2:3b',
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // nuxt.options.runtimeConfig.public.duck = defu(nuxt.options.runtimeConfig.public.duck)

    addServerHandler({
      route: '/api/chat',
      handler: resolver.resolve('./runtime/chat'),
    })

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))

    if (options.devtools)
      setupDevToolsUI(nuxt, resolver)
  },
})
