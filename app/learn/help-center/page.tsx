"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { API_URLS } from "@/app/api/url";
import { Skeleton } from "@/components/ui/skeleton";
import HelpCard from "./HelpCard";
import axios from "axios";

type Card = {
  title: string;
  iconUrl: string;
  links: string[];
};

const HelpCenterPage = () => {
  const [cardData, setCardData] = useState<Card[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URLS.HELP_CARD);
        setCardData(response.data);
      } catch (error) {
        console.error("Error fetching card data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div
        className="bg-cover bg-center h-[220px] flex flex-col justify-center items-center text-white"
        style={{
          backgroundImage:
            "url('https://tribe-s3-production.imgix.net/pNjC7h1dgJgePWHQA7krF?w=2000&auto=compress')",
        }}
      >
        <h1 className="sm:text-xl text-sm font-medium">
          Welcome to the Help Center
        </h1>
        <h2 className="text-center sm:text-4xl text-xl font-bold">
          How can we help you?
        </h2>
        <div className="relative mt-4 w-[60%]">
          <Input
            type="text"
            placeholder="Search for answers"
            className="pr-12"
          />
          <Search className="absolute top-1.5 right-3 text-gray-400" />
        </div>
      </div>

      <div className="px-6 py-10 text-white">
        <h3 className="text-2xl font-bold mb-6">Find articles by topic</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="p-4">
                  <Skeleton className="h-12 w-12 rounded-full mb-4" />
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-5/6 mb-1" />
                  <Skeleton className="h-4 w-5/6 mb-1" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              ))
            : cardData.map((data, index) => (
                <HelpCard
                  key={index}
                  title={data.title}
                  iconUrl={data.iconUrl}
                  links={data.links}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default HelpCenterPage;
