<script lang="ts" setup>
const props = defineProps({
  videoId: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <div class="aspect-video">
    <iframe
      class="h-full w-full"
      :src="`https://player.vimeo.com/video/${props.videoId}`"
      title="Video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</template>
