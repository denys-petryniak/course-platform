export const useFirstLesson = () => {
  const { chapters } = useCourse();
  const firstLesson = chapters[0].lessons[0];

  return { firstLesson };
};
