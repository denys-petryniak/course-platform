export default defineNuxtRouteMiddleware(({ path }) => {
  const navigationHistory = useLocalStorage('history', []) as Ref<string[]>

  navigationHistory.value.push(path)
})
