export default defineNuxtRouteMiddleware(({ path }) => {
  const navigationHistory = useLocalStorage("history", []);

  navigationHistory.value.push(path);
});
