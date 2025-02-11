import { Team } from "@/app/(main)/hall-of-fame/leaderboard/page";
import { Badge } from "../ui/badge";

const Card = ({
  team,
  rank,
  className,
}: {
  team: Team;
  rank: number;
  className: string;
}) => {
  const borderColors = [
    "border-yellow-300",
    "border-gray-300",
    "border-orange-300",
  ];

  const textColors = [
    "text-yellow-500 dark:text-yellow-300",
    "text-gray-500 dark:text-gray-300",
    "text-orange-500 dark:text-orange-300",
  ];

  return (
    <div
      className={`flex flex-col items-center p-2 rounded-2xl shadow-md bg-neutral-50 dark:bg-neutral-900 dark:border ${className}`}
    >
      <h3 className={`text-sm md:text-base font-bold ${textColors[rank - 1]}`}>
        Place {rank}
      </h3>
      <img
        src={team.avatar}
        alt={team.team}
        className={`w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border-2 border-white mb-2 ${
          borderColors[rank - 1]
        }`}
      />
      <h3 className="text-sm md:text-base font-bold">{team.team}</h3>
      <div className="flex items-center gap-2 my-1">
        <img
          src={team.flag}
          alt={team.country}
          className="w-6 h-4 rounded-sm"
        />
        <p className="text-xs text-gray-600">{team.country}</p>
      </div>
      <div className="flex-col md:w-[80%] items-center gap-1 mt-1">
        <Badge className="text-xs md:w-full m-1">{team.wins} Wins</Badge>
        <Badge variant="outline" className="text-xs md:w-full m-1">
          {team.points} Points
        </Badge>
      </div>
    </div>
  );
};

export default Card;
