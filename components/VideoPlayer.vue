<script setup lang="ts">
interface Props {
  videoId: number
}

const props = defineProps<Props>()
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
    />
  </div>
</template>
