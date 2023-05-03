<script setup lang="ts">
const user = useSupabaseUser();
const firstLesson = await useFirstLesson();

watchEffect(async () => {
  if (user.value) {
    const route = useRoute();

    await useFetch(`/api/user/linkWithPurchase/${route.params.paymentId}`, {
      // https://github.com/nuxt/nuxt/issues/14920#issuecomment-1397368855
      headers: useRequestHeaders(["cookie"]) as Record<string, string>,
    });

    await navigateTo(firstLesson.path, {
      replace: true,
    });
  }
});
</script>

<template>
  <Loading
    class="!absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-36 w-36"
  />
</template>
