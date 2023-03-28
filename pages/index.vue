<script lang="ts" setup>
const { firstLesson } = useFirstLesson();
</script>

<template>
  <NuxtLink class="underline font-medium" :to="firstLesson.path">
    Go to first lesson
  </NuxtLink>
</template>
