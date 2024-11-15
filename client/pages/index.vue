<template>
  <div class="container mx-auto h-full flex gap-4 flex-col">
    <div class="flex gap-3">
      <form
        action="/api/store"
        method="get"
      >
        <button
          type="submit"
          class="btn btn-primary"
        >
          Reindex store
        </button>
      </form>
      <button
        type="button"
        class="btn btn-error w-fit"
        @click="reloadNuxtApp()"
      >
        New Chat
      </button>
    </div>
    <h1 class="text-2xl font-semibold text-white mb-8">
      Rubberduck
    </h1>
    <div class="max-w-4xl mx-auto grow flex overflow-hidden">
      <div
        class="relative grow overflow-y-auto"
      >
        <div
          v-for="m in messages"
          :key="m.id"
        >
          <article
            v-if="m.role === 'user'"
            class="flex justify-end mb-6"
          >
            <p class="p-2 bg-neutral-700 text-white rounded w-fit">
              {{ m.content }}
            </p>
          </article>
          <article
            v-if="m.role === 'assistant'"
            class="prose mb-6 text-neutral-50a"
            v-html="marked.parse(m.content)"
          />
        </div>
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
          class="input w-full"
        >
        <button
          class="btn btn-success text-white"
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
