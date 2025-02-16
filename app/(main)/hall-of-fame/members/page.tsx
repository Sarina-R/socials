"use client";

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
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface Team {
  team_id: number;
  team_name: string;
  joined_at: string;
  left_at?: string;
  role: string;
  team_logo: string;
}

interface Member {
  user_id: number;
  avatar: string;
  user_name: string;
  email: string;
  current_team: Team;
  previous_teams: Team[];
  total_wins: number;
  total_points: number;
  last_active: string;
}

const Members = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(API_URLS.MEMBERS);
        setMembers(response.data);
      } catch (error) {
        console.error("Failed to fetch members:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  const toggleRow = (userId: number) => {
    setExpandedRow(expandedRow === userId ? null : userId);
  };

  const filteredMembers = members.filter(
    (member) =>
      member.user_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="md:p-6 p-1 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Team Members</h1>
      <Input
        placeholder="Search members..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4"
      />
      <Card className="overflow-x-auto rounded-lg p-1 shadow-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Current Team</TableHead>
              <TableHead>Wins</TableHead>
              <TableHead>Last Active</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading
              ? [...Array(5)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Skeleton className="h-4 w-32" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-40" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-24" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-12" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-20" />
                    </TableCell>
                  </TableRow>
                ))
              : filteredMembers.map((member) => (
                  <>
                    <TableRow
                      key={member.user_id}
                      className="cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-900 transition"
                      onClick={() => toggleRow(member.user_id)}
                    >
                      <TableCell className="flex items-center gap-2 hover:underline">
                        <Link
                          href={`/user/${member.user_id}`}
                          className="flex items-center justify-center gap-2"
                        >
                          <Avatar>
                            <AvatarImage
                              src={member.avatar}
                              alt={member.user_name}
                              className="object-cover"
                            />
                            <AvatarFallback>
                              {member.user_name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          {member.user_name}
                        </Link>
                      </TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500 text-white">
                          {member.current_team.team_name}
                        </Badge>
                      </TableCell>
                      <TableCell>{member.total_wins}</TableCell>
                      <TableCell>
                        {new Date(member.last_active).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                    {expandedRow === member.user_id && (
                      <motion.tr
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <TableCell colSpan={5} className="p-4 text-sm">
                          {member.previous_teams.length > 0 ? (
                            <div>
                              <h3 className="font-semibold text-neutral-700 dark:text-neutral-300">
                                Previous Teams:
                              </h3>
                              <ul className="list-disc pl-5 mt-2">
                                {member.previous_teams.map((team) => (
                                  <li
                                    key={team.team_id}
                                    className="flex items-center gap-3"
                                  >
                                    <div className="relative h-8 w-8 m-1">
                                      <Image
                                        src={team.team_logo}
                                        alt={team.team_name}
                                        fill
                                        className="rounded-full border object-cover"
                                      />
                                    </div>
                                    <span>
                                      {team.team_name} ({team.role})
                                    </span>
                                    <span className="text-xs text-neutral-600 dark:text-neutral-400">
                                      {new Date(
                                        team.joined_at
                                      ).toLocaleDateString()}{" "}
                                      -{" "}
                                      {team.left_at
                                        ? new Date(
                                            team.left_at
                                          ).toLocaleDateString()
                                        : "Present"}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ) : (
                            <p className="text-neutral-500">
                              The user has only been in{" "}
                              {member.current_team.team_name}.
                            </p>
                          )}
                        </TableCell>
                      </motion.tr>
                    )}
                  </>
                ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Members;
