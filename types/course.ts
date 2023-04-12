import type { Lesson } from "@prisma/client";
import { type } from "os";

export type LessonWithPath = Lesson & {
  path: string;
};

export type ChapterProgress = {
  [key: string]: boolean;
};

export type CourseProgress = {
  [key: string]: ChapterProgress;
};
