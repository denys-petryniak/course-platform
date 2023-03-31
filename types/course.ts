export type Lesson = {
  title: string;
  slug: string;
  number: number;
  downloadUrl: string;
  videoId: number;
  text: string;
  sourceUrl?: string;
};

export type LessonWIthPath = Lesson & {
  path: string;
};

export type Chapter = {
  title: string;
  slug: string;
  number: number;
  lessons: Lesson[] | LessonWIthPath[];
};

export type Course = {
  title: string;
  chapters: Chapter[];
};
