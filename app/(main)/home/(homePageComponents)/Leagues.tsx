"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { API_URLS } from "@/app/api/url";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

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
        console.log("Error fetching event data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <>
        <div className="mt-4 space-y-8 p-0 lg:p-6">
          <div className=" hidden sm:block">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-3">
              {[...Array(3)].map((_, index) => (
                <Card key={index} className="p-4 space-y-4">
                  <Skeleton className="w-full h-48 rounded-lg" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <div className="flex gap-2">
                    {[...Array(2)].map((_, idx) => (
                      <Skeleton key={idx} className="h-6 w-16 rounded-full" />
                    ))}
                  </div>
                  <Skeleton className="h-5 w-1/3" />
                  <div className="flex gap-4">
                    <Skeleton className="h-10 w-1/2" />
                    <Skeleton className="h-10 w-1/2" />
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="sm:hidden space-y-4">
            {[...Array(3)].map((_, index) => (
              <Card
                key={index}
                className="max-w-xl flex p-4 gap-4 shadow-lg sm:hidden"
              >
                <div className="w-32 h-20 relative">
                  <Skeleton className="w-full h-full rounded-lg" />
                </div>

                <div className="flex flex-col flex-grow space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <div className="bg-neutral-100 dark:bg-neutral-900 p-2 rounded-md mt-2 flex justify-between text-sm">
                    <div className="flex flex-col items-center">
                      <span className="text-[0.7rem] px-2">Age Category</span>
                      <Skeleton className="h-4 w-12 rounded-full" />
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-[0.7rem] px-2">Registration</span>
                      <Skeleton className="h-5 w-16 rounded-full" />
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2 justify-between">
                    <Skeleton className="h-8 w-14 rounded-md" />
                    <Skeleton className="h-8 w-16 rounded-md" />
                    <Skeleton className="h-8 w-20 rounded-md" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="mt-4 space-y-8 p-0 lg:p-6">
      {Object.keys(eventGroups).map((groupName, index) => (
        <div key={index}>
          <h2 className="text-3xl font-semibold mb-6">{groupName}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-3">
            {eventGroups[groupName].map((event, index) => (
              <>
                {/* desktop */}
                <Card
                  key={index}
                  className="hidden sm:block rounded-lg overflow-hidden transition-transform transform"
                >
                  <div className="relative w-full h-48">
                    <Image
                      src={event.image}
                      alt={event.title}
                      objectFit="cover"
                      fill
                      className="rounded-t-lg"
                    />
                  </div>

                  <div className="p-4 space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold">{event.title}</h3>
                      <p className="text-neutral-600 dark:text-neutral-400 text-xs">
                        {groupName}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {event.category.map((cat, idx) => (
                        <Badge
                          key={idx}
                          className="bg-black dark:text-black dark:bg-white text-white"
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

                    <div className="flex gap-2 mx-auto mt-4">
                      <Button variant="outline" className="w-1/2">
                        View Teams
                      </Button>
                      <Button className="w-1/2 bg-black dark:text-black dark:bg-white text-white">
                        Register
                      </Button>
                    </div>
                  </div>
                </Card>

                {/* mobile */}
                <Card className="max-w-xl flex p-4 gap-4 shadow-lg sm:hidden">
                  <div className="w-32 h-20 relative">
                    <Image
                      src={event.image}
                      alt={event.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold">{event.title}</h2>
                    <p className="text-neutral-600 dark:text-neutral-400 text-xs">
                      {groupName}
                    </p>

                    <div className="bg-neutral-100 dark:bg-neutral-900 w-full p-2 rounded-md mt-2 flex justify-between">
                      <div className="flex flex-col items-center">
                        <span className="text-[0.7rem] px-2">Age Category</span>
                        {event.category.map((cat, index) => (
                          <span
                            key={index}
                            className="text-xs py-1 px-2 bg-black dark:bg-white text-white dark:text-black rounded-full mb-1"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <span className="text-[0.7rem] px-2">Registration</span>
                        <span className="text-green-600 bg-green-100 rounded-full py-1 px-2">
                          Open
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 flex gap-2 justify-between">
                      <Button
                        className="font-bold p-1 px-2 text-xs"
                        variant="outline"
                      >
                        Rules
                      </Button>
                      <Button
                        className="font-bold p-1 px-2 text-xs"
                        variant="outline"
                      >
                        View Teams
                      </Button>
                      <Button className="font-bold p-1 px-2 text-xs">
                        Register
                      </Button>
                    </div>
                  </div>
                </Card>
              </>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Leagues;
