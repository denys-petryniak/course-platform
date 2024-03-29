import { defineStore } from 'pinia'
import type { CourseProgress } from '~/types/course'

export const useCourseProgress = defineStore('courseProgress', () => {
  const progress = ref<CourseProgress>({})
  const initialized = ref(false)

  async function initialize() {
    // If the course has already been initialized, return
    if (initialized.value)
      return
    initialized.value = true

    const { data: userProgress } = await useFetch<CourseProgress>(
      '/api/user/progress',
      // https://github.com/nuxt/nuxt/issues/14920#issuecomment-1397368855
      { headers: useRequestHeaders(['cookie']) as Record<string, string> },
    )

    // Update progress value
    if (userProgress.value)
      progress.value = userProgress.value
  }

  // Toggle the progress of a lesson based on chapter slug and lesson slug
  const toggleComplete = async (completed: boolean) => {
    // If there's no user we can't update the progress
    const user = useSupabaseUser()
    if (!user.value)
      return

    // Grab chapter and lesson slugs from the route
    const {
      params: { chapterSlug, lessonSlug },
    } = useRoute()

    const chapter = chapterSlug as string
    const lesson = lessonSlug as string

    // Get the current progress for the lesson
    const currentProgress = progress.value[chapter]?.[lesson]

    // Optimistically update the progress value in the UI
    progress.value[chapter] = {
      ...progress.value[chapter],
      [lesson]: completed,
    }

    // Update the progress in the DB
    try {
      await $fetch(`/api/course/chapter/${chapter}/lesson/${lesson}/progress`, {
        method: 'POST',
        // Automatically stringified by ofetch
        body: {
          completed,
        },
      })
    }
    catch (error) {
      console.error(error)

      // If the request failed, revert the progress value
      progress.value[chapter] = {
        ...progress.value[chapter],
        [lesson]: currentProgress,
      }
    }
  }

  const percentageCompleted = computed(() => {
    const chapters = Object.values(progress.value).map((chapter) => {
      const lessons = Object.values(chapter)
      const completedLessons = lessons.filter(lesson => lesson)
      return Number((completedLessons.length / lessons.length) * 100).toFixed(
        0,
      )
    }, [])

    const totalLessons = Object.values(progress.value).reduce(
      (number, chapter) => {
        return number + Object.values(chapter).length
      },
      0,
    )

    const totalCompletedLessons = Object.values(progress.value).reduce(
      (number, chapter) => {
        return (
          number + Object.values(chapter).filter(lesson => lesson).length
        )
      },
      0,
    )

    const course = Number((totalCompletedLessons / totalLessons) * 100).toFixed(
      0,
    )

    return {
      chapters,
      course,
    }
  })

  return {
    initialize,
    progress,
    toggleComplete,
    percentageCompleted,
  }
})
