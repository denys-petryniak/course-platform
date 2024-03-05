<script lang="ts" setup>
interface Props {
  title?: string
}

// Don't inherit the attributes from the parent component
// since we only put them on the slot
defineOptions({
  inheritAttrs: false,
})

defineProps<Props>()
</script>

<template>
  <div class="section flex flex-col items-center bg-white p-24">
    <div class="w-full max-w-4xl">
      <h2 v-if="title" class="pb-8 text-center text-4xl font-bold">
        {{ title }}
      </h2>
      <div v-bind="$attrs">
        <slot />
      </div>
    </div>
  </div>
</template>

<style>
.section:nth-of-type(even) {
  @apply bg-blue-500 text-white;
}
</style>
