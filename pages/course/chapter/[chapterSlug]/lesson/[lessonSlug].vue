<script lang="ts" setup>
import { useCourseProgress } from '~/stores/courseProgress'

const user = useSupabaseUser()
const course = await useCourse()
const route = useRoute()

const { chapterSlug, lessonSlug } = route.params as {
  chapterSlug: string
  lessonSlug: string
}

const lesson = await useLesson(chapterSlug, lessonSlug)

const store = useCourseProgress()
const { initialize, toggleComplete } = store

if (user.value)
  initialize()

const isCompleted = computed(() => {
  return store.progress?.[chapterSlug]?.[lessonSlug] || false
})

definePageMeta({
  middleware: [
    async ({ params }) => {
      const course = await useCourse()

      const chapter = course.value.chapters.find(
        chapter => chapter.slug === params.chapterSlug,
      )

      if (!chapter) {
        return abortNavigation(
          createError({
            statusCode: 404,
            message: 'Chapter not found',
          }),
        )
      }

      const lesson = chapter.lessons.find(
        lesson => lesson.slug === params.lessonSlug,
      )

      if (!lesson) {
        return abortNavigation(
          createError({
            statusCode: 404,
            message: 'Lesson not found',
          }),
        )
      }
    },
    'auth',
  ],
})

const chapter = computed(() => {
  return course.value.chapters.find(
    chapter => chapter.slug === route.params.chapterSlug,
  )
})

const title = computed(() => `${lesson.value?.title} | ${course.value.title}`)

useHead({
  title,
})
</script>

<template>
  <div>
    <p class="mb-1 mt-0 font-bold uppercase text-slate-400">
      Lesson {{ chapter?.number }} - {{ lesson.number }}
    </p>
    <h2 class="my-0">
      {{ lesson?.title }}
    </h2>
    <div class="mb-8 mt-2 flex space-x-4">
      <NuxtLink
        v-if="lesson.sourceUrl"
        class="text-md font-normal text-gray-500"
        :href="lesson.sourceUrl"
        target="_blank"
      >
        Download Source Code
      </NuxtLink>
      <NuxtLink
        v-if="lesson.downloadUrl"
        class="text-md font-normal text-gray-500"
        :href="lesson.downloadUrl"
        target="_blank"
      >
        Download Video
      </NuxtLink>
    </div>
    <VideoPlayer v-if="lesson.videoId" :video-id="lesson.videoId" />
    <p>{{ lesson.text }}</p>
    <LessonCompleteButton
      v-if="user"
      :model-value="isCompleted"
      @update:model-value="toggleComplete"
    />
  </div>
</template>
