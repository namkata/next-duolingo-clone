import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Header } from "./header";
import { UserProgress } from "@/components/user-progress";
import { getUnits, getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";

const LearnPage = async () => {
  const userProgressData = getUserProgress();
  const unitsData = getUnits();

  const [userProcess, units] = await Promise.all([userProgressData, unitsData]);

  if (!userProcess || !userProcess.activeCourse) {
    redirect("/courses");
  }

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProcess.activeCourse}
          hearts={userProcess.hearts}
          points={userProcess.points}
          hasActiveSubscription={false}
        />
      </StickyWrapper>
      <FeedWrapper>
        <Header title={userProcess.activeCourse.title} />
        {units.map(unit =>
          <div key={unit.id} className="mb-10">
            {JSON.stringify(unit)}
          </div>
        )}
      </FeedWrapper>
    </div>
  );
};
export default LearnPage;
