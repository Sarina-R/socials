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
      Leaderboard
    </>
  );
};

export default Leaderboard;
