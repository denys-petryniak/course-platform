export default defineNuxtRouteMiddleware(({ params, path }) => {
  const user = useSupabaseUser();

  if (user.value || params.chapterSlug === "1-chapter-1") {
    return;
  }

  return navigateTo(`/login?redirectTo=${path}`);
});
