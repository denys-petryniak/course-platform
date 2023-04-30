<script setup lang="ts">
interface Props {
  modelValue: boolean;
}

withDefaults(defineProps<Props>(), {
  modelValue: false,
});

defineEmits<{
  (event: "update:modelValue", chapter: string, lesson: string): void;
}>();
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
      @input="() => $emit('update:modelValue', !modelValue)"
      class="hidden"
    />
    {{ modelValue ? "Completed!" : "Mark as complete" }}
  </label>
</template>

<style scoped>
::selection {
  display: none;
}
</style>
