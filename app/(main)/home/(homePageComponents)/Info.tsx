"use client";

import { API_URLS } from "@/app/api/url";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Globe, MapPin } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

interface EventData {
  poster: string;
  important_dates: Record<string, string>;
  about_event: string;
  country: { name: string; flag_url: string };
  event_dates: { start: string; end: string };
  city: string;
  event_type: string;
  organizers: organizers[];
}

interface organizers {
  name: string;
  logo: string;
}

const Info = () => {
  const [loading, setLoading] = useState(true);
  const [eventData, setEventData] = useState<EventData>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URLS.INFO);
        setEventData(response.data);
      } catch (error) {
        console.log("Error fetching event data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  if (loading || !eventData) {
    return (
      <div className="lg:grid grid-cols-3 gap-6 lg:space-y-0 space-y-6 p-0 md:p-4 xl:p-6">
        <div className="col-span-2 space-y-6">
          <Card className="shadow-lg p-6 rounded-lg">
            <Skeleton className="h-6 w-40 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
            <div className="mt-4 space-y-2">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          </Card>
        </div>

        <div className="col-span-1 space-y-6">
          <Skeleton className="w-full h-56 rounded-lg" />
          <Card className="shadow-lg p-6 rounded-lg">
            <Skeleton className="h-6 w-40 mb-4" />
            <div className="mt-4 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </Card>
        </div>
      </div>
    );
  }
  return (
    <div className="lg:grid grid-cols-3 gap-6 lg:space-y-0 space-y-6 p-0 md:p-4 xl:p-6">
      <div className="col-span-2 space-y-6">
        <Card className="shadow-lg p-6 space-y-6 rounded-lg">
          <CardTitle className="text-2xl font-bold">About this Event</CardTitle>
          <p className="text-neutral-600 dark:text-neutral-300 mt-2">
            {eventData?.about_event}
          </p>

          <div className="sm:grid grid-cols-2 gap-4">
            <Card className="flex flex-col items-center gap-3 p-4 sm:mb-0 mb-4 rounded-xl">
              <h3 className="text-sm font-semibold mb-2 px-3 py-1 rounded-full text-white bg-black dark:text-black dark:bg-white">
                Date
              </h3>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm">
                  <CalendarDays className="w-5 h-5" />
                  <span>{formatDate(eventData!.event_dates.start)}</span>
                </div>
                <Separator className="w-32 dark:bg-white bg-black relative bottom-[-1.3rem]" />
                <div className="item-center justify-center z-50 flex">
                  <div className="w-6 h-6 bg-black text-white dark:bg-white dark:text-black rounded-full">
                    <span className="text-xs p-1 font-semibold">To</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CalendarDays className="w-5 h-5" />
                  <span>{formatDate(eventData!.event_dates.end)}</span>
                </div>
              </div>
            </Card>

            <div className="items-center space-y-3 gap-4 rounded-xl">
              <Card className="flex p-3 gap-3 justify-center items-center">
                <div className="relative w-9 h-9">
                  <Image
                    src={eventData?.country.flag_url || ""}
                    alt={eventData?.country.name || ""}
                    fill
                    className="object-cover rounded-full border"
                  />
                </div>
                <span className="text-lg font-semibold">
                  {eventData?.country.name}
                </span>
              </Card>

              <Card className="flex p-3 gap-3 justify-center items-center">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-5 h-5 te-400" />
                  <span>{eventData?.city}</span>
                </div>
              </Card>

              <Card className="flex p-3 gap-3 justify-center items-center">
                <div className="flex items-center gap-2 text-sm">
                  <Globe className="w-5 h-5 te-400" />
                  <Badge>{eventData?.event_type}</Badge>
                </div>
              </Card>
            </div>
          </div>
        </Card>

        <div className="p-6">
          <CardTitle className="text-xl font-semibold">Partners</CardTitle>
          <div className="mt-4 flex flex-wrap gap-4">
            {eventData?.organizers.map((org, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-2 rounded-lg"
              >
                <div className="relative w-24 h-14">
                  <Image
                    src={org.logo}
                    alt={org.name}
                    fill
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="col-span-1 space-y-6">
        <div className="rounded-lg overflow-hidden shadow-lg">
          <Image
            src={eventData?.poster || "/default-poster.jpg"}
            alt="Event Poster"
            width={800}
            height={600}
            className="w-full h-auto object-cover"
          />
        </div>

        <Card className="shadow-lg p-6 rounded-lg">
          <CardTitle className="text-xl font-semibold">
            Important Dates
          </CardTitle>
          <div className="mt-4 space-y-4">
            {Object.entries(eventData?.important_dates || {}).map(
              ([title, date], index) => (
                <div
                  key={index}
                  className="flex items-center border-l-2 border-neutral-300 dark:border-neutral-600 pl-4"
                >
                  <div className="relative left-[-1.65rem] bg-neutral-50 dark:bg-neutral-900 rounded-full">
                    <CalendarDays className="w-5 h-5 p-1" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium ">{title}</span>
                    <div className="bg-neutral-50 dark:bg-neutral-900 w-full px-3 py-1 rounded-[1rem]">
                      <p className="text-xs">{date}</p>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Info;
