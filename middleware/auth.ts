export default defineNuxtRouteMiddleware(async (to) => {
  const user = useSupabaseUser();
  const hasAccess = await $fetch("/api/user/hasAccess", {
    // https://github.com/nuxt/nuxt/issues/14920#issuecomment-1397368855
    headers: useRequestHeaders(["cookie"]) as Record<string, string>,
  });

  const firstChapterSlug = "1-chapter-1";

  if (hasAccess || to.params.chapterSlug === firstChapterSlug) {
    return;
  }

  if (user.value && !hasAccess) {
    // Prevent logging in with Github if user has not purchased course
    const client = useSupabaseClient();
    await client.auth.signOut();

    alert(
      "The rest of the course content is available to customers who have made a purchase"
    );

    return navigateTo(`/`);
  }

  return navigateTo(`/login?redirectTo=${to.path}`);
});
