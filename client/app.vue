<template>
  <main class="bg-neutral-900 text-neutral-50">
    <div class="p-6 h-screen flex gap-4 flex-col  mx-auto max-w-4xl">
      <!--      <div> -->
      <!--        {{ selectedModel }} -->
      <!--        <select v-model="selectedModel"> -->
      <!--          <option -->
      <!--            v-for="name in modelNames" -->
      <!--            :key="name" -->
      <!--          > -->
      <!--            {{ name }} -->
      <!--          </option> -->
      <!--        </select> -->
      <!--      </div> -->
      <h1 class="text-3xl font-bold mb-8">
        Rubberduck, quack quack  🦆
      </h1>
      <div class="grow flex overflow-hidden">
        <div
          v-autoscroll
          class="relative grow overflow-y-auto px-6"
        >
          <template
            v-for="m in messages"
            :key="m.id"
          >
            <article
              v-if="m.role === 'user'"
              class="flex justify-end mb-6 ml-12"
            >
              <p class="p-2 bg-blue-700 rounded w-fit">
                {{ m.content }}
              </p>
            </article>
            <article
              v-if="m.role === 'assistant'"
              class="prose max-w-none mb-6 mr-12 prose-pre:bg-neutral-800"
              v-html="marked.parse(m.content)"
            />
          </template>
        </div>
      </div>
      <div class="flex flex-col gap-4">
        <form
          class="flex gap-4 items-center"
          @submit="handleSubmit"
        >
          <textarea
            ref="textarea"
            v-model="input"
            :autofocus="true"
            placeholder="Stel je vraag..."
            class="max-h-52 leading-8 min-h-14 resize-none bg-neutral-800 py-3 px-4 rounded w-full"
          />

          <button
            class="rounded h-fit hover:bg-green-900 transition-all bg-green-700 px-6 py-3 text-white"
            type="submit"
            :disabled="isLoading"
          >
            Verstuur
          </button>
        </form>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { marked } from 'marked'
import { useChat } from '@ai-sdk/vue'
import { useTextareaAutosize } from '@vueuse/core'
import 'chat-auto-scroll'
// import { getModels } from '../src/runtime/ollama'

// const { modelNames } = await getModels()
// const selectedModel = ref(modelNames[0])

const { messages, input, handleSubmit, isLoading } = useChat({
  keepLastMessageOnError: true,
})

const { textarea } = useTextareaAutosize({ input })
</script>

<style scoped>
textarea {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

textarea::-webkit-scrollbar {
  display: none;
}
</style>
