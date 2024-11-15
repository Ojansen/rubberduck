import { LlamaIndexAdapter } from 'ai'
import {
  Settings,
  Ollama,
  OllamaEmbedding,
  SimpleChatEngine,
} from 'llamaindex'

export default defineEventHandler(async (event) => {
  const { messages } = await readBody(event)

  Settings.embedModel = new OllamaEmbedding({
    model: 'nomic-embed-text',
  })

  Settings.llm = new Ollama({
    model: 'llama3.2:3b',
  })

  const chatEngine = new SimpleChatEngine()

  const stream = await chatEngine.chat({
    message: messages[messages.length - 1].content,
    stream: true,
  })

  return LlamaIndexAdapter.toDataStreamResponse(stream)
})
