"use client";

import { useEffect, useState } from "react";
import { Team } from "./page";
import { API_URLS } from "@/app/api/url";
import Card from "@/components/leaderboard/Card";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

const TopThree = () => {
  const [top3, setTop3] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopThree = async () => {
      try {
        const response = await axios.get(API_URLS.Leaderboard);
        setTop3(response.data.slice(0, 3));
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTopThree();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="hidden md:flex items-end justify-center gap-4 mt-8">
          <Skeleton className="w-44 h-56" />
          <Skeleton className="w-52 h-64" />
          <Skeleton className="w-44 h-56" />
        </div>
        <div className="flex flex-col md:hidden items-center gap-4 mt-8">
          <Skeleton className="w-full h-52 -mb-3" />
          <div className="flex w-full justify-between gap-4">
            <Skeleton className="w-full h-48" />
            <Skeleton className="w-full h-48" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="hidden md:flex items-end justify-center gap-4 mt-8">
        {top3[1] && (
          <Card team={top3[1]} rank={2} className="w-44 h-[14.5rem]" />
        )}
        {top3[0] && <Card team={top3[0]} rank={1} className="w-52 h-64" />}
        {top3[2] && (
          <Card team={top3[2]} rank={3} className="w-44 h-[14.5rem]" />
        )}
      </div>

      <div className="flex flex-col md:hidden items-center gap-4 mt-8">
        {top3[0] && (
          <Card
            team={top3[0]}
            rank={1}
            className="w-full h-52 -mb-3  first-place"
          />
        )}
        <div className="flex w-full justify-between gap-4">
          {top3[1] && (
            <Card team={top3[1]} rank={2} className="w-full h-[12.3rem]" />
          )}
          {top3[2] && (
            <Card team={top3[2]} rank={3} className="w-full h-[12.3rem]" />
          )}
        </div>
      </div>
    </>
  );
};

export default TopThree;
