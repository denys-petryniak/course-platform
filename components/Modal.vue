<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";

const emit = defineEmits(["close"]);
const modalContent = ref(null);

onClickOutside(modalContent, () => {
  emit("close");
});

const previousOverflow = ref("");

onMounted(() => {
  // Lock the scrollbar by removing overflow if we have any
  previousOverflow.value = document.body.style.overflow;
  document.body.style.overflow = "hidden";
});

onBeforeUnmount(() => {
  // Restore the overflow and position
  document.body.style.overflow = previousOverflow.value;
});
</script>

<template>
  <div
    class="w-100vw h-100vh fixed inset-0 flex flex-col items-center justify-center backdrop-blur-xl backdrop-brightness-50"
  >
    <div
      class="absolute right-4 top-4 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-slate-600 text-2xl text-white transition hover:bg-slate-500"
      @click="$emit('close')"
    >
      &#10005;
    </div>
    <div ref="modalContent" class="w-full max-w-2xl">
      <slot />
    </div>
  </div>
</template>
