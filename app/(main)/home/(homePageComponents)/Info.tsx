"use client";

import { API_URLS } from "@/app/api/url";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

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

  if (loading) {
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
        <Card className="shadow-lg p-6 rounded-lg">
          <CardTitle className="text-2xl font-bold dark:text-neutral-200 text-neutral-800">
            About this Event
          </CardTitle>
          <p className="text-neutral-600 dark:text-neutral-300 mt-2">
            {eventData?.about_event}
          </p>
          <div className="mt-4 text-neutral-700 text-sm dark:text-neutral-300">
            <p>
              <strong>Location:</strong> {eventData?.city},
              {eventData?.country.name}
            </p>
            <p>
              <strong>Date:</strong> {eventData?.event_dates.start} to
              {eventData?.event_dates.end}
            </p>
            <p>
              <strong>Event Type: </strong>
              <span>
                <Badge>{eventData?.event_type}</Badge>
              </span>
            </p>
          </div>
        </Card>
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
          <CardTitle className="text-xl font-semibold dark:text-neutral-200 text-neutral-800">
            Important Dates
          </CardTitle>
          <div className="mt-4 space-y-4">
            {Object.entries(eventData?.important_dates || {}).map(
              ([title, date], index) => (
                <div
                  key={index}
                  className="flex items-center border-l-2 border-gray-300 dark:border-neutral-600 pl-4"
                >
                  <div className="relative left-[-1.65rem] dark:bg-neutral-900 rounded-full">
                    <CalendarDays className="w-5 h-5 p-1 text-neutral-500 dark:text-neutral-400" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium dark:text-neutral-200 text-neutral-700">
                      {title}
                    </span>
                    <div className="dark:bg-neutral-900 w-full px-3 py-1 rounded-[1rem]">
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
