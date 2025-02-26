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
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

const getRandomColor = (() => {
  const colors = [
    "dark:bg-violet-600 bg-violet-200",
    "dark:bg-emerald-600 bg-emerald-200",
    "dark:bg-blue-600 bg-blue-200",
    "dark:bg-green-600 bg-green-200",
    "dark:bg-yellow-600 bg-yellow-200",
    "dark:bg-purple-600 bg-purple-200",
    "dark:bg-pink-600 bg-pink-200",
    "dark:bg-indigo-600 bg-indigo-200",
    "dark:bg-teal-600 bg-teal-200",
  ];
  let index = 0;
  return () => colors[index++ % colors.length];
})();

const DifficultTable = () => {
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [loading, setLoading] = useState(true);
  const eventColors = new Map<string, string>();

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

  if (loading)
    return (
      <p className="text-center text-lg font-semibold">Loading schedule...</p>
    );
  if (!schedule)
    return (
      <p className="text-center text-lg text-red-500">No data available.</p>
    );

  const categories = Object.keys(schedule.data);
  const uniqueDates = new Set<string>();
  const allEvents: Event[] = [];

  categories.forEach((category) => {
    Object.values(schedule.data[category]).forEach((league) => {
      league.forEach((event) => {
        uniqueDates.add(event.date);
        allEvents.push(event);
        if (!eventColors.has(event.title)) {
          eventColors.set(event.title, getRandomColor());
        }
      });
    });
  });

  const sortedDates = Array.from(uniqueDates).sort();
  let minTime = "23:59",
    maxTime = "00:00";
  allEvents.forEach((event) => {
    if (!event.time_string) return;
    const times = event.time_string.split(" - ");
    if (times.length < 2) return;
    minTime = times[0] < minTime ? times[0] : minTime;
    maxTime = times[1] > maxTime ? times[1] : maxTime;
  });

  const generateTimeSlots = (start: string, end: string) => {
    const slots: string[] = [];
    let startTime = parse(start, "HH:mm", new Date());
    const endTime = parse(end, "HH:mm", new Date());
    while (startTime <= endTime) {
      slots.push(format(startTime, "HH:mm"));
      startTime = addMinutes(startTime, 30);
    }
    return slots;
  };
  const timeSlots = generateTimeSlots(minTime, maxTime);

  return (
    <ScrollArea className="w-full max-h-[80vh] rounded-lg">
      <ScrollArea className="w-full">
        <div className="min-w-[40rem] max-h-[80vh] text-neutral-900 dark:text-neutral-100">
          <table className="w-full text-sm shadow-lg">
            <thead className="sticky top-0 bg-white dark:bg-neutral-900 z-10">
              <tr className="bg-neutral-300 dark:bg-neutral-800 text-black dark:text-white">
                <th rowSpan={2} className="p-2">
                  Date
                </th>
                <th rowSpan={2} className="p-2">
                  Time
                </th>
                {categories.map((category) => (
                  <th
                    key={category}
                    colSpan={Object.keys(schedule.data[category]).length}
                    className="p-2"
                  >
                    {category}
                  </th>
                ))}
              </tr>
              <tr className="bg-neutral-200 dark:bg-neutral-700">
                {categories.map((category) =>
                  Object.keys(schedule.data[category]).map((league) => (
                    <th key={league} className="p-2">
                      {league}
                    </th>
                  ))
                )}
              </tr>
            </thead>
            <tbody>
              {sortedDates.map((date) => (
                <React.Fragment key={date}>
                  <tr className="bg-neutral-200 dark:bg-neutral-700">
                    <td
                      rowSpan={timeSlots.length + 1}
                      className="p-3 border-b-4 border-white dark:border-black font-bold text-center"
                    >
                      {format(new Date(date), "EEEE, MMM d")}
                    </td>
                  </tr>
                  {timeSlots.map((time) => (
                    <tr key={`${date}-${time}`}>
                      <td className="px-3 pb-3 border-t border-r text-center">
                        {time}
                      </td>
                      {categories.map((category) =>
                        Object.keys(schedule.data[category]).map((league) => {
                          const event = schedule.data[category][league].find(
                            (e) =>
                              e.date === date &&
                              e.time_string?.split(" - ")[0] <= time &&
                              e.time_string?.split(" - ")[1] > time
                          );
                          return (
                            <td
                              key={`${date}-${time}-${league}`}
                              className={`p-2 text-center ${
                                event ? eventColors.get(event.title) : ""
                              }`}
                            >
                              {event &&
                              event.time_string.split(" - ")[0] === time ? (
                                <Tooltip>
                                  <TooltipTrigger className="cursor-pointer">
                                    {event.title}
                                  </TooltipTrigger>
                                  <TooltipContent className="bg-neutral-800 dark:bg-neutral-50 p-2 rounded-md">
                                    <p className="max-w-40">
                                      {event.description}
                                    </p>
                                    <p className="text-xs text-yellow-500">
                                      {event.time_string}
                                    </p>
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
        <ScrollBar orientation="vertical" />
      </ScrollArea>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default DifficultTable;
