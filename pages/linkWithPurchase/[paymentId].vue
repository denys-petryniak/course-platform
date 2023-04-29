<script setup lang="ts">
const user = useSupabaseUser();

watchEffect(async () => {
  if (user.value) {
    const route = useRoute();

    await useFetch(`/api/user/linkWithPurchase/${route.params.paymentId}`, {
      // https://github.com/nuxt/nuxt/issues/14920#issuecomment-1397368855
      headers: useRequestHeaders(["cookie"]) as Record<string, string>,
    });

    await navigateTo("/", {
      replace: true,
    });
  }
});
</script>

<template>
  <!-- No need for a template here -->
</template>
