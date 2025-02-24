"use client";

import { format, parse, addMinutes } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React, { useState, useEffect } from "react";
import { API_URLS } from "@/app/api/url";
import axios from "axios";
import { Event, Schedule } from "@/app/(main)/home2/Schedule";

const categoryColors: Record<string, string> = {
  "Fira Air": "bg-blue-200",
  "Fira Challenge": "bg-green-200",
};

const DifficultTable = () => {
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URLS.SCHEDULE);
        setSchedule(response.data);
      } catch (error) {
        console.error("Error fetching schedule:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading schedule...</p>;
  if (!schedule) return <p>No data available.</p>;

  const categories = Object.keys(schedule.data);
  const uniqueDates = new Set<string>();
  const allEvents: Event[] = [];

  categories.forEach((category) => {
    Object.values(schedule.data[category]).forEach((league) => {
      league.forEach((event) => {
        uniqueDates.add(event.date);
        allEvents.push(event);
      });
    });
  });

  const sortedDates = Array.from(uniqueDates).sort();

  let minTime = "23:59";
  let maxTime = "00:00";
  allEvents.forEach((event) => {
    const times = event.time_string.split(" - ");
    if (times.length > 1) {
      minTime = times[0] < minTime ? times[0] : minTime;
      maxTime = times[1] > maxTime ? times[1] : maxTime;
    } else {
      minTime = times[0] < minTime ? times[0] : minTime;
      maxTime = times[0] > maxTime ? times[0] : maxTime;
    }
  });

  const generateTimeSlots = (start: string, end: string) => {
    let slots: string[] = [];
    let startTime = parse(start, "HH:mm", new Date());
    let endTime = parse(end, "HH:mm", new Date());
    while (startTime <= endTime) {
      slots.push(format(startTime, "HH:mm"));
      startTime = addMinutes(startTime, 30);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots(minTime, maxTime);

  return (
    <div className="overflow-x-auto">
      <table className="border-collapse w-full text-sm">
        <thead>
          <tr className="bg-red-300">
            <th className="border border-gray-500 p-2">Date</th>
            <th className="border border-gray-500 p-2">Time</th>
            {categories.map((category) => (
              <th
                key={category}
                colSpan={Object.keys(schedule.data[category]).length}
                className="border border-gray-500 p-2"
              >
                {category}
              </th>
            ))}
          </tr>
          <tr className="bg-gray-200">
            <th className="border border-gray-500 p-2"></th>
            <th className="border border-gray-500 p-2"></th>
            {categories.map((category) =>
              Object.keys(schedule.data[category]).map((league) => (
                <th key={league} className="border border-gray-500 p-2">
                  {league}
                </th>
              ))
            )}
          </tr>
        </thead>
        <tbody>
          {sortedDates.map((date) => (
            <React.Fragment key={date}>
              <tr className="bg-pink-300">
                <td
                  rowSpan={timeSlots.length + 1}
                  className="border border-gray-500 p-2 font-bold align-top w-24 text-center"
                >
                  {format(new Date(date), "EEEE, MMM d")}
                </td>
              </tr>
              {timeSlots.map((time) => (
                <tr key={`${date}-${time}`}>
                  <td className="border border-gray-500 p-2 bg-gray-100 text-center font-medium">
                    {time}
                  </td>
                  {categories.map((category) =>
                    Object.keys(schedule.data[category]).map((league) => {
                      const event = schedule.data[category][league].find(
                        (e) =>
                          e.date === date &&
                          (e.time_string.includes(time) ||
                            (e.time_string.split(" - ")[0] <= time &&
                              e.time_string.split(" - ")[1] >= time))
                      );
                      return (
                        <td
                          key={`${date}-${time}-${league}`}
                          className={`border p-2 text-center text-sm relative ${
                            event ? categoryColors[category] : ""
                          }`}
                        >
                          {event ? (
                            <Tooltip>
                              <TooltipTrigger>
                                <span className="cursor-pointer">
                                  {event.title}
                                </span>
                              </TooltipTrigger>
                              <TooltipContent>
                                <div>
                                  <p className="font-bold">{event.title}</p>
                                  <p className="max-w-40">
                                    {event.description}
                                  </p>
                                  <p className="text-yellow-300">
                                    {event.time_string}
                                  </p>
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          ) : (
                            ""
                          )}
                        </td>
                      );
                    })
                  )}
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DifficultTable;
