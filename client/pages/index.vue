<template>
  <div class="p-6 h-screen flex gap-4 flex-col text-neutral-50 mx-auto max-w-4xl">
    <h1 class="text-3xl font-bold mb-8">
      Rubberduck, quack quack  🦆
    </h1>
    <div class="grow flex overflow-hidden">
      <div
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
            class="prose max-w-none mb-6 mr-12"
            v-html="marked.parse(m.content)"
          />
        </template>
      </div>
    </div>
    <div class="flex flex-col gap-4">
      <form
        class="flex gap-4"
        @submit="handleSubmit"
      >
        <input
          v-model="input"
          placeholder="Message"
          name="prompt"
          type="text"
          class="bg-neutral-800 py-3 px-4 rounded w-full"
        >
        <button
          class="rounded hover:bg-green-900 transition-all bg-green-700 px-6 py-3 text-white"
          type="submit"
          :disabled="isLoading"
        >
          Verstuur
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { marked } from 'marked'
import { useChat } from '@ai-sdk/vue'

const { messages, input, handleSubmit, isLoading } = useChat({
  api: 'http://localhost:3000/__duck/api/chat',
  keepLastMessageOnError: true,
})
</script>
