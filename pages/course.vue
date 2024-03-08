<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCourseProgress } from '~/stores/courseProgress'

const user = useSupabaseUser()
const course = await useCourse()
const firstLesson = await useFirstLesson()

const { percentageCompleted } = storeToRefs(useCourseProgress())

async function resetError(error: Ref<Error | null>) {
  await navigateTo(firstLesson.path)

  error.value = null
}
</script>

<template>
  <div>
    <div class="mb-4 flex w-full items-center justify-between">
      <h1 class="text-3xl font-bold">
        {{ course.title }}
      </h1>
      <UserCard />
    </div>
    <div class="flex flex-grow flex-row justify-center">
      <div
        class="prose mr-4 flex min-w-[20ch] max-w-[30ch] flex-col rounded-md bg-white p-8"
      >
        <h3>Chapters</h3>
        <div
          v-for="(chapter, chapterIndex) in course.chapters"
          :key="chapter.slug"
          class="mb-4 flex flex-col space-y-1"
        >
          <h4 class="flex items-center justify-between">
            {{ chapter.title }}
            <span
              v-if="percentageCompleted.chapters[chapterIndex] && user"
              class="text-sm text-emerald-500"
            >
              {{ percentageCompleted.chapters[chapterIndex] }}%
            </span>
          </h4>
          <NuxtLink
            v-for="(lesson, lessonIndex) in chapter.lessons"
            :key="lesson.slug"
            class="prose-sm -mx-4 flex flex-row space-x-1 px-4 py-1 font-normal no-underline"
            :to="lesson.path"
            :class="{
              'text-blue-500': lesson.path === $route.fullPath,
              'text-gray-600': lesson.path !== $route.fullPath,
            }"
          >
            <span class="text-gray-500">{{ lessonIndex + 1 }}.</span>
            <span>{{ lesson.title }}</span>
          </NuxtLink>
        </div>
        <div
          v-if="percentageCompleted.course && user"
          class="mt-8 flex items-center justify-between text-sm font-medium text-gray-500"
        >
          Course completion:
          <span> {{ percentageCompleted.course }}% </span>
        </div>
      </div>
      <div class="prose w-[65ch] rounded-md bg-white p-8">
        <NuxtErrorBoundary>
          <NuxtPage />
          <template #error="{ error }">
            <p>
              Oh no, something went wrong with the lesson!
              <code>{{ error }}</code>
            </p>
            <p>
              <button
                class="rounded bg-gray-500 px-3 py-1 font-bold text-white hover:cursor-pointer"
                @click="resetError(error)"
              >
                Reset
              </button>
            </p>
          </template>
        </NuxtErrorBoundary>
      </div>
    </div>
  </div>
</template>
