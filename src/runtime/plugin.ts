import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  console.log('loaded Autoscroll plugin')
  nuxtApp.vueApp.directive('autoscroll', {
    mounted: (el) => {
      let scrolledToBottom = true

      el.addEventListener('scroll', (event: Event) => {
        const target = event.target as HTMLElement
        scrolledToBottom = target.scrollTop + target.offsetHeight >= target.scrollHeight - 1
      })

      const observer = new MutationObserver(() => {
        if (scrolledToBottom) {
          el.scrollTop = el.scrollHeight
        }
      })

      observer.observe(el, { childList: true, subtree: true })
    },
  })
})
