import { getLesson, getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";
import { Quiz } from "./quiz";

const LessonPage = async () => {
  const lessonData = getLesson();
  const userProcessData = getUserProgress();
  const [lesson, userProgress] = await Promise.all([
    lessonData,
    userProcessData
  ]);

  if (!lesson || !userProgress) {
    redirect("/learn");
  }

  const initialPercentage =
    lesson.challenges.filter(challenge => challenge.completed).length /
    lesson.challenges.length *
    100;

  return (
    <div>
      <Quiz
        initialLessonId={lesson.id}
        initialLessonChallenges={lesson.challenges}
        initialHearts={userProgress.hearts}
        initialPercentage={initialPercentage}
        userSubscription={undefined}
      />
    </div>
  );
};
export default LessonPage;
