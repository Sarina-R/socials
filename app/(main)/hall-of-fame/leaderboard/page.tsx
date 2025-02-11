import CategoryTable from "./CategoryTable";
import TopTable from "./TopTable";
import TopThree from "./TopThree";

export interface Team {
  avatar?: string;
  team: string;
  country: string;
  flag: string;
  wins: number;
  points: number;
}

const Leaderboard = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-col-3 gap-4 sm:p-4 p-1">
      <div className="lg:col-span-3">
        <TopThree />
      </div>
      <div className="lg:col-span-2">
        <CategoryTable title="Air Emergency Service (Indoor)" />
        <CategoryTable title="Smart Home (U14)" />
      </div>

      <div className="lg:col-span-1 p-4 flex flex-col lg:flex-row gap-4 lg:items-start items-center">
        <TopTable />
      </div>
    </div>
  );
};

export default Leaderboard;
