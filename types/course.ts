import type { Lesson } from '@prisma/client'

export type LessonWithPath = Lesson & {
  path: string
}

export interface ChapterProgress {
  [key: string]: boolean
}

export interface CourseProgress {
  [key: string]: ChapterProgress
}
