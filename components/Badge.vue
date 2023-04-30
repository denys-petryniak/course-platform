<script setup lang="ts">
interface Props {
  color?: string;
}

withDefaults(defineProps<Props>(), {
  // Must be complete Tailwind classes otherwise they will
  // not be included in build
  color: "bg-emerald-400",
});
</script>

<template>
  <span
    class="absolute -left-12 mr-4 inline-flex h-8 w-8 items-center justify-center rounded-full text-xl text-white"
    :class="`${color}`"
  >
    <slot>&#10003;</slot>
  </span>
</template>
