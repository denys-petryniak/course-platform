import { Lesson, LessonWIthPath, Chapter, Course } from "~/types/course";
import courseData from "./courseData";

export const useCourse = (): Course => {
  const chapters: Chapter[] = courseData.chapters.map((chapter: Chapter) => {
    const lessons: LessonWIthPath[] = chapter.lessons.map((lesson: Lesson) => ({
      ...lesson,
      path: `/course/chapter/${chapter.slug}/lesson/${lesson.slug}`,
    }));

    return {
      ...chapter,
      lessons,
    };
  });

  return {
    ...courseData,
    chapters,
  };
};
