<script lang="ts" setup>
interface Props {
  modelValue: boolean
}

withDefaults(defineProps<Props>(), {
  modelValue: false,
})

defineEmits<{
  (event: 'update:modelValue', chapter: string, lesson: string): void
}>()
</script>

<template>
  <label
    class="cursor-pointer rounded px-4 py-2 font-bold text-white"
    :class="{
      'bg-green-500': modelValue,
      'bg-gray-500': !modelValue,
    }"
  >
    <input
      type="checkbox"
      :value="modelValue"
      class="hidden"
      @change="() => $emit('update:modelValue', !modelValue)"
    >
    {{ modelValue ? "Completed!" : "Mark as complete" }}
  </label>
</template>

<style scoped>
::selection {
  display: none;
}
</style>
