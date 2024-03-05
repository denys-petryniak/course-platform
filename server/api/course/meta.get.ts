import PrismaClientPackage from '@prisma/client'
import type { Prisma as PrismaType } from '@prisma/client'

const { Prisma, PrismaClient } = PrismaClientPackage
const prisma = new PrismaClient()

const lessonSelect = Prisma.validator<PrismaType.LessonArgs>()({
  select: {
    title: true,
    slug: true,
    number: true,
  },
})

export type LessonOutline = PrismaType.LessonGetPayload<typeof lessonSelect> & {
  path: string
}

const chapterSelect = Prisma.validator<PrismaType.ChapterArgs>()({
  select: {
    title: true,
    slug: true,
    number: true,
    lessons: lessonSelect,
  },
})

export type ChapterOutline = Omit<
  PrismaType.ChapterGetPayload<typeof chapterSelect>,
  'lessons'
> & {
  lessons: LessonOutline[]
}

const courseSelect = Prisma.validator<PrismaType.CourseArgs>()({
  select: {
    title: true,
    chapters: chapterSelect,
  },
})

export type CourseOutline = Omit<
  PrismaType.CourseGetPayload<typeof courseSelect>,
  'chapters'
> & {
  chapters: ChapterOutline[]
}

export default defineEventHandler(async (): Promise<CourseOutline> => {
  const outline = await prisma.course.findFirst(courseSelect)

  // Error if there is no course
  if (!outline) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Course not found',
    })
  }

  // Map the outline so we can add a path to each lesson
  const chapters = outline.chapters.map(chapter => ({
    ...chapter,
    lessons: chapter.lessons.map(lesson => ({
      ...lesson,
      path: `/course/chapter/${chapter.slug}/lesson/${lesson.slug}`,
    })),
  }))

  return {
    ...outline,
    chapters,
  }
})
