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

const getRandomColor = (() => {
  const colors = [
    "dark:bg-vioconst-400 bg-vioconst-200",
    "dark:bg-emerald-400 bg-emerald-200",
    "dark:bg-blue-400 bg-blue-200",
    "dark:bg-green-400 bg-green-200",
    "dark:bg-yellow-400 bg-yellow-200",
    "dark:bg-purple-400 bg-purple-200",
    "dark:bg-pink-400 bg-pink-200",
    "dark:bg-indigo-400 bg-indigo-200",
    "dark:bg-teal-400 bg-teal-200",
  ];
  const usedColors = new Set();
  return () => {
    if (usedColors.size >= colors.length) usedColors.clear();
    const availableColors = colors.filter((color) => !usedColors.has(color));
    const chosenColor =
      availableColors[Math.floor(Math.random() * availableColors.length)];
    usedColors.add(chosenColor);
    return chosenColor;
  };
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
      <p className="text-center text-lg font-semibold text-neutral-900 dark:text-neutral-100">
        Loading schedule...
      </p>
    );
  if (!schedule)
    return (
      <p className="text-center text-lg text-red-500 dark:text-red-400">
        No data available.
      </p>
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

  let minTime = "23:59";
  let maxTime = "00:00";
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
    <div className="overflow-x-auto text-neutral-900 dark:text-neutral-100">
      <table className="-collapse w-full text-sm shadow-lg rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-neutral-300 dark:bg-neutral-800 text-black dark:text-white">
            <th className="p-3">Date</th>
            <th className="p-3">Time</th>
            {categories.map((category) => (
              <th
                key={category}
                colSpan={Object.keys(schedule.data[category]).length}
                className="p-3"
              >
                {category}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedDates.map((date) => (
            <React.Fragment key={date}>
              <tr className="bg-neutral-200 dark:bg-neutral-700">
                <td
                  rowSpan={timeSlots.length + 1}
                  className="p-3 border-b-2 border-white dark:border-black font-bold text-center"
                >
                  {format(new Date(date), "EEEE, MMM d")}
                </td>
              </tr>
              {timeSlots.map((time) => (
                <tr
                  key={`${date}-${time}`}
                  className="hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  <td className="p-3 text-center">{time}</td>
                  {categories.map((category) =>
                    Object.keys(schedule.data[category]).map((league) => {
                      const event = schedule.data[category][league].find(
                        (e) => e.date === date && e.time_string?.includes(time)
                      );
                      return (
                        <td
                          key={`${date}-${time}-${league}`}
                          className={`p-3 text-center relative ${
                            event
                              ? eventColors.get(event.title)
                              : "bg-neutral-50 dark:bg-neutral-800"
                          }`}
                        >
                          {event ? (
                            <Tooltip>
                              <TooltipTrigger className="cursor-pointer">
                                {event.title}
                              </TooltipTrigger>
                              <TooltipContent className="bg-neutral-800 dark:bg-neutral-50 p-2 rounded-md">
                                <p className="max-w-40">{event.description}</p>
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
  );
};

export default DifficultTable;
