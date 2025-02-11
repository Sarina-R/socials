"use client";

import { useEffect, useState } from "react";
import { Team } from "./page";
import { API_URLS } from "@/app/api/url";
import axios from "axios";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2 } from "lucide-react";

const CategoryTable = ({ title }: { title: string }) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(API_URLS.Leaderboard);
        setTeams(response.data.slice(0, 20));
      } catch (error) {
        console.error("Failed to fetch teams:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeams();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-center mb-6">{title}</h2>
      <ScrollArea className="h-96">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead>Team</TableHead>
              <TableHead>Country</TableHead>
              <TableHead className="text-right">Wins</TableHead>
              <TableHead className="text-right">Points</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                  Loading teams...
                </TableCell>
              </TableRow>
            ) : (
              teams.map((team, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage
                          className="object-cover"
                          src={team.avatar}
                          alt={team.team}
                        />
                        <AvatarFallback>{team.team.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{team.team}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <img
                        src={team.flag}
                        alt={team.country}
                        className="w-6 h-4 rounded-sm"
                      />
                      <span>{team.country}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{team.wins}</TableCell>
                  <TableCell className="text-right">{team.points}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};

export default CategoryTable;
