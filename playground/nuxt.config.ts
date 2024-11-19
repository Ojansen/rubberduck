import { resolve } from 'node:path'
import { defineNuxtConfig } from 'nuxt/config'
import { defineNuxtModule } from '@nuxt/kit'
import { startSubprocess } from '@nuxt/devtools-kit'

export default defineNuxtConfig({

  modules: [
    '../src/module',
    defineNuxtModule({
      setup(_, nuxt) {
        if (!nuxt.options.dev)
          return

        const subprocess = startSubprocess(
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
        subprocess.getProcess().stdout?.on('data', (data) => {
          console.log(` - devtools: ${data.toString()}`)
        })
        subprocess.getProcess().stderr?.on('data', (data) => {
          console.error(` - devtools: ${data.toString()}`)
        })

        process.on('exit', () => {
          subprocess.terminate()
        })
      },
    }),
  ],
  devtools: {
    enabled: true,
  },

  compatibilityDate: '2024-08-21',
})
