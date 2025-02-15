"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { API_URLS } from "@/app/api/url";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

interface Team {
  avatar?: string;
  team: string;
  country: string;
  flag: string;
  wins: number;
  points: number;
}

const TeamLeaderboard = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(API_URLS.Leaderboard);
        const sortedTeams = response.data.sort((a: Team, b: Team) =>
          a.team.localeCompare(b.team)
        );
        setTeams(sortedTeams);
      } catch (error) {
        console.error("Failed to fetch teams:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeams();
  }, []);

  const filteredTeams = teams.filter(
    (team) =>
      team.team.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto md:p-6 p-1">
      <h2 className="text-3xl font-bold mb-6 text-center">Teams</h2>
      <Input
        type="text"
        placeholder="Search by team or country..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 w-full p-3 border rounded-md"
      />
      <div className="overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow className="bg-neutral-50 dark:bg-neutral-900">
              <TableHead className="p-4 text-left">Team</TableHead>
              <TableHead className="p-4 text-left">Country</TableHead>
              <TableHead className="p-4 text-center">Wins</TableHead>
              <TableHead className="p-4 text-center">Points</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading
              ? [...Array(10)].map((_, i) => (
                  <TableRow key={i} className="border-b">
                    <TableCell className="p-4 flex items-center gap-3">
                      <Skeleton className="w-10 h-10 rounded-full" />
                      <Skeleton className="w-32 h-6" />
                    </TableCell>
                    <TableCell className="p-4">
                      <Skeleton className="w-20 h-5" />
                    </TableCell>
                    <TableCell className="p-4 text-center">
                      <Skeleton className="w-10 h-5" />
                    </TableCell>
                    <TableCell className="p-4 text-center">
                      <Skeleton className="w-10 h-5" />
                    </TableCell>
                  </TableRow>
                ))
              : filteredTeams.map((team, index) => (
                  <TableRow
                    key={index}
                    className="border-b hover:bg-gray-50 dark:hover:bg-gray-900 transition duration-200"
                  >
                    <TableCell className="p-4 flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={team.avatar} alt={team.team} />
                        <AvatarFallback>{team.team.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{team.team}</span>
                    </TableCell>
                    <TableCell className="p-4">
                      <div className="flex items-center gap-2">
                        <img
                          src={team.flag}
                          alt={team.country}
                          className="w-6 h-4 rounded-sm border"
                        />
                        <span>{team.country}</span>
                      </div>
                    </TableCell>
                    <TableCell className="p-4 text-center font-semibold">
                      {team.wins}
                    </TableCell>
                    <TableCell className="p-4 text-center font-bold text-green-600 dark:text-green-400">
                      {team.points}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TeamLeaderboard;
