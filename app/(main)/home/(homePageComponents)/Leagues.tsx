"use client";

import { useEffect, useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { API_URLS } from "@/app/api/url";
import Image from "next/image";
import axios from "axios";

interface EventData {
  title: string;
  category: string[];
  image: string;
  registrationStatus: "Open" | "Closed";
}

interface EventGroups {
  [key: string]: EventData[];
}

const Leagues = () => {
  const [loading, setLoading] = useState(true);
  const [eventGroups, setEventGroups] = useState<EventGroups>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URLS.LEAGUES);
        setEventGroups(response.data);
      } catch (error) {
        console.error("Error fetching event data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSmoothScroll = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (loading) {
    return (
      <ScrollArea className="w-full overflow-x-auto">
        <div className="flex space-x-4 p-4">
          {[...Array(3)].map((_, index) => (
            <Card key={index} className="w-64 p-4 space-y-4">
              <Skeleton className="w-full h-32 rounded-lg" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </Card>
          ))}
        </div>
      </ScrollArea>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4 mb-8">
        {Object.keys(eventGroups).map((groupName, index) => (
          <Badge
            key={index}
            onClick={() => handleSmoothScroll(groupName)}
            className="cursor-pointer transition-all"
          >
            {groupName}
          </Badge>
        ))}
      </div>

      {Object.keys(eventGroups).map((groupName, index) => (
        <div key={index} id={groupName}>
          <h2 className="text-2xl font-semibold mb-4">{groupName}</h2>
          <ScrollArea className="w-full overflow-x-auto">
            <div className="flex space-x-4 p-2">
              {eventGroups[groupName].map((event, index) => (
                <Card key={index} className="w-64 p-4 space-y-4 shadow-lg">
                  <div className="relative w-full h-32">
                    <Image
                      src={event.image}
                      alt={event.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  </div>
                  <h3 className="text-lg font-semibold">{event.title}</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {groupName}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {event.category.map((cat, index) => (
                      <Badge
                        key={index}
                        className="bg-black text-white dark:bg-white dark:text-black"
                      >
                        {cat}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold">Registration: </span>
                    <span
                      className={
                        event.registrationStatus === "Open"
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      {event.registrationStatus}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" className="w-1/2">
                      View Teams
                    </Button>
                    <Button className="w-1/2 bg-black text-white dark:bg-white dark:text-black">
                      Register
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      ))}
    </div>
  );
};

export default Leagues;
