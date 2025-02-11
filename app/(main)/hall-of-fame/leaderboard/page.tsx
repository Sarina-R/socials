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
    <>
      <TopThree />
      <TopTable />

      <h2>Category 1</h2>
      <CategoryTable title="Table 1" />

      <h2>Category 2</h2>
      <CategoryTable title="Table 2" />
    </>
  );
};

export default Leaderboard;
