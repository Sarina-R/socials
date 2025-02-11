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
    </>
  );
};

export default Leaderboard;
