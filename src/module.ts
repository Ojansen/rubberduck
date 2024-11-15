import { resolve } from 'node:path'
import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'
import { startSubprocess } from '@nuxt/devtools-kit'
import defu from 'defu'
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

    nuxt.options.runtimeConfig.public.duck = defu(nuxt.options.runtimeConfig.public.duck)

    if (!nuxt.options.dev) {
      return
    }

    const _process = startSubprocess(
      {
        command: 'npx',
        args: ['nuxi', 'dev', '--port', '3300'],
        cwd: resolve(__dirname, '../client'),
      },
      {
        id: 'rubberduck:client',
        name: 'rubberduck Client Dev',
      },
    )

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))

    if (options.devtools)
      setupDevToolsUI(nuxt, resolver)
  },
})
