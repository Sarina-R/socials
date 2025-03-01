import { format, parse, addMinutes } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React, { useState, useEffect } from "react";
import { API_URLS } from "@/app/api/url";
import { Event, Schedule } from "@/app/(main)/home2/Schedule";
import axios from "axios";

const getRandomColor = (() => {
  const colors = [
    "dark:bg-red-300 bg-red-200",
    "dark:bg-amber-300 bg-amber-200",
    "dark:bg-purple-300 bg-purple-200",
    "dark:bg-lime-300 bg-lime-200",
    "dark:bg-sky-300 bg-sky-200",
    "dark:bg-green-300 bg-green-200",
    "dark:bg-pink-300 bg-pink-200",
    "dark:bg-emerald-300 bg-emerald-200",
    "dark:bg-fuchsia-300 bg-fuchsia-200",
    "dark:bg-cyan-300 bg-cyan-200",
    "dark:bg-blue-300 bg-blue-200",
    "dark:bg-teal-300 bg-teal-200",
    "dark:bg-indigo-300 bg-indigo-200",
    "dark:bg-violet-300 bg-violet-200",
    "dark:bg-orange-300 bg-orange-200",
    "dark:bg-yellow-300 bg-yellow-200",
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
        const eventKey = String(event.id ?? event.title);
        if (!eventColors.has(eventKey)) {
          eventColors.set(eventKey, getRandomColor());
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
    <div className="rounded-lg">
      <div className="w-full overflow-auto rounded-lg">
        <div className="min-w-full max-h-[80vh] text-neutral-900 dark:text-neutral-100">
          <table className="w-full text-sm shadow-lg max-w-[100vw]">
            <thead className="sticky top-0 bg-white dark:bg-neutral-900 z-10">
              <tr className="bg-neutral-300 dark:bg-neutral-800 text-black dark:text-white">
                <th
                  rowSpan={2}
                  className="p-2 sticky left-0 bg-neutral-300 dark:bg-neutral-800 z-20"
                >
                  Date
                </th>
                <th
                  rowSpan={2}
                  className="p-2 sticky left-[86.76px] z-20 bg-neutral-300 dark:bg-neutral-800"
                >
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
                  <tr className="">
                    <td
                      rowSpan={timeSlots.length + 1}
                      className="bg-neutral-200 dark:bg-neutral-700 sticky z-9 left-0 p-3 border-b-4 font-bold text-center"
                    >
                      {format(new Date(date), "EEEE, MMM d")}
                    </td>
                  </tr>
                  {timeSlots.map((time) => (
                    <tr key={`${date}-${time}`}>
                      <tr className="sticky z-9 left-[86.76px]">
                        <td className="w-[60px] h-[40px] px-3 pb-3 text-center dark:bg-black bg-white">
                          {time}
                        </td>
                      </tr>
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
                              className={`p-2 text-center text-black ${
                                event
                                  ? eventColors.get(
                                      String(event.id ?? event.title)
                                    )
                                  : ""
                              }`}
                            >
                              {event &&
                              event.time_string.split(" - ")[0] === time ? (
                                <Tooltip>
                                  <TooltipTrigger className="cursor-pointer min-w-max">
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
      </div>
    </div>
  );
};

export default DifficultTable;
