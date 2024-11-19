import { $fetch } from 'ofetch'

export async function getModels() {
  const response = await $fetch('http://localhost:11434/api/tags')
  const json = await response.json()

  const modelNames: string[] = []

  for (const model of json.models) {
    modelNames.push(model.model)
  }

  return { modelNames }
}
