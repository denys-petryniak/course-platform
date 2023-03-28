export default defineNuxtRouteMiddleware(({ params }) => {
  if (params.chapterSlug === "1-chapter-1") {
    return;
  }

  return navigateTo("/login");
});
