"use client";

import { API_URLS } from "@/app/api/url";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Card, CardTitle } from "@/components/ui/card";

interface EventData {
  poster: string;
  important_dates: Record<string, string>;
  about_event: string;
  country: { name: string; flag_url: string };
  event_dates: { start: string; end: string };
  city: string;
  event_type: string;
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
        console.log("Error fetching feed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col xl:flex-row gap-10 p-8">
      <div className="flex-1 space-y-6">
        <Card className="shadow-lg p-6 rounded-lg">
          <CardTitle className="text-2xl font-bold dark:text-neutral-200 text-neutral-800">
            About the Event
          </CardTitle>
          <p className="text-neutral-600 dark:text-neutral-300">
            {eventData?.about_event}
          </p>
          <div className="mt-4 text-neutral-700">
            <p>
              Location: {eventData?.city}, {eventData?.country.name}
            </p>
            <p>
              Date: {eventData?.event_dates.start} to
              {eventData?.event_dates.end}
            </p>
            <p>Event Type: {eventData?.event_type}</p>
          </div>
        </Card>
      </div>

      <div className="flex-1 space-y-6">
        <div className="rounded-lg overflow-hidden shadow-lg">
          <Image
            src={eventData?.poster || "/default-poster.jpg"}
            alt="Event Poster"
            width={800}
            height={600}
            className="w-full h-auto object-cover"
          />
        </div>

        <div className="shadow-lg p-6 rounded-lg">
          <CardTitle className="text-xl font-semibold dark:text-neutral-200 text-neutral-800">
            Important Dates
          </CardTitle>
          <div className="space-y-4 mt-4">
            {Object.entries(eventData?.important_dates || {}).map(
              ([title, date], index) => (
                <div
                  key={index}
                  className="flex justify-between text-neutral-600 dark:text-neutral-300"
                >
                  <span>{title}</span>
                  <span>{date}</span>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
