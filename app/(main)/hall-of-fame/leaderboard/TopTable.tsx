"use client";

import { useEffect, useState } from "react";
import { Team } from "./page";
import { API_URLS } from "@/app/api/url";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";

const TopTable = () => {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(API_URLS.Leaderboard);
        setTeams(response.data.slice(0, 20));
      } catch (error) {
        console.error("Failed to fetch teams:", error);
      }
    };
    fetchTeams();
  }, []);

  return (
    <ScrollArea className="h-60 lg:max-w-max w-full">
      <div className="max-w-md mx-auto p-4">
        <h2 className="text-lg font-bold text-center mb-4">Leaderboard</h2>
        <div className="space-y-4">
          {teams.map((team, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <span className="text-sm mt-4 font-medium text-gray-500">
                  {index + 1}
                </span>
                {index < teams.length - 1 && (
                  <div className="w-px bg-gray-300 h-full mt-1"></div>
                )}
              </div>
              <Avatar className="w-12 h-12">
                <AvatarImage
                  className="object-cover"
                  src={team.avatar}
                  alt={team.team}
                />
                <AvatarFallback>{team.team.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold">{team.team}</p>
                <p className="text-xs text-gray-500">
                  {team.wins} Wins • {team.points} Points
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
};

export default TopTable;
