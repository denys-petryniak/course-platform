import PrismaClientPackage from '@prisma/client'
import protectRoute from '~/server/utils/protectRoute'

const { PrismaClient } = PrismaClientPackage
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const { chapterSlug, lessonSlug } = event.context.params as {
    chapterSlug: string
    lessonSlug: string
  }

  const firstChapterSlug = '1-chapter-1'

  // We allow users to access the first lesson without beeing logged in
  if (chapterSlug !== firstChapterSlug)
    protectRoute(event)

  const lesson = await prisma.lesson.findFirst({
    where: {
      slug: lessonSlug,
      Chapter: {
        slug: chapterSlug,
      },
    },
  })

  if (!lesson) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Lesson not found',
    })
  }

  return {
    ...lesson,
    path: `/course/chapter/${chapterSlug}/lesson/${lessonSlug}`,
  }
})
