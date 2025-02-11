"use client";

import { useEffect, useState } from "react";
import { Team } from "./page";
import { API_URLS } from "@/app/api/url";
import Card from "@/components/leaderboard/Card";
import axios from "axios";

const TopThree = () => {
  const [top3, setTop3] = useState<Team[]>([]);

  useEffect(() => {
    const fetchTopThree = async () => {
      try {
        const response = await axios.get(API_URLS.Leaderboard);
        setTop3(response.data.slice(0, 3));
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchTopThree();
  }, []);

  if (!top3.length) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <>
      <div className="hidden md:flex items-end justify-center gap-4 mt-8">
        {top3[1] && <Card team={top3[1]} rank={2} className="w-44 h-56" />}
        {top3[0] && <Card team={top3[0]} rank={1} className="w-52 h-64" />}
        {top3[2] && <Card team={top3[2]} rank={3} className="w-44 h-56" />}
      </div>

      <div className="flex flex-col md:hidden items-center gap-4 mt-8">
        {top3[0] && (
          <Card team={top3[0]} rank={1} className="w-full h-52 -mb-3" />
        )}
        <div className="flex w-full justify-between gap-4">
          {top3[1] && <Card team={top3[1]} rank={2} className="w-full h-48" />}
          {top3[2] && <Card team={top3[2]} rank={3} className="w-full h-48" />}
        </div>
      </div>
    </>
  );
};

export default TopThree;
