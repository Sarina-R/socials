"use client";

import { useEffect, useState } from "react";
import { API_URLS } from "@/app/api/url";
import { Skeleton } from "@/components/ui/skeleton";
import Card from "@/components/affiliations/Card";
import axios from "axios";

interface Countries {
  countryName: string;
  id: number;
  rank: number;
  totalPoint: number;
  countryFlag: string;
}

const TopThreeCountries = () => {
  const [top3, setTop3] = useState<Countries[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopThree = async () => {
      try {
        const response = await axios.get(API_URLS.AFFILIATIONS);
        const sortedCountries = response.data.top_countries.sort(
          (a: Countries, b: Countries) => a.rank - b.rank
        );
        setTop3(sortedCountries.slice(0, 3));
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
          <Skeleton className="w-44 h-44" />
          <Skeleton className="w-52 h-48" />
          <Skeleton className="w-44 h-44" />
        </div>
        <div className="flex flex-col md:hidden items-center gap-4 mt-8">
          <Skeleton className="w-full h-40 -mb-3" />
          <div className="flex w-full justify-between gap-4">
            <Skeleton className="w-full h-36" />
            <Skeleton className="w-full h-36" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="hidden md:flex items-end justify-center gap-4 mt-8">
        {top3[1] && <Card country={top3[1]} rank={2} className="w-44 h-44" />}
        {top3[0] && <Card country={top3[0]} rank={1} className="w-52 h-48" />}
        {top3[2] && <Card country={top3[2]} rank={3} className="w-44 h-44" />}
      </div>

      <div className="flex flex-col md:hidden items-center gap-4 mt-8">
        {top3[0] && (
          <Card country={top3[0]} rank={1} className="w-full h-40 -mb-3" />
        )}
        <div className="flex w-full justify-between gap-4">
          {top3[1] && (
            <Card country={top3[1]} rank={2} className="w-full h-36" />
          )}
          {top3[2] && (
            <Card country={top3[2]} rank={3} className="w-full h-36" />
          )}
        </div>
      </div>
    </>
  );
};

export default TopThreeCountries;
