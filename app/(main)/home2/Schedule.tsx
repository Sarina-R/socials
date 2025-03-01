"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { format } from "date-fns";
import axios from "axios";
import { API_URLS } from "@/app/api/url";
import DifficultTable from "@/components/schedule/DifficultTable";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface Event {
  id: number;
  status: string;
  date_created: string;
  user_updated: string;
  date_updated: string;
  event: string;
  date: string;
  title: string;
  time_string: string;
  description: string;
  category: string;
  league: string;
}

export interface League {
  [leagueName: string]: Event[];
}

export interface Category {
  [categoryName: string]: League;
}

export interface Schedule {
  data: Category;
}

const ScheduleComponent = () => {
  const [view, setView] = useState<string>("difficultTable");
  const [data, setData] = useState<Category>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Schedule>(API_URLS.SCHEDULE);
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching schedule:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const eventsByDate: Event[] = Object.entries(data).flatMap(
    ([category, leagues]) =>
      Object.entries(leagues).flatMap(([league, events]) =>
        events.map((event) => ({ ...event, category, league }))
      )
  );

  const eventsGroupedByDate = eventsByDate.reduce<Record<string, Event[]>>(
    (acc, event) => {
      acc[event.date] = acc[event.date] || [];
      acc[event.date].push(event);
      return acc;
    },
    {}
  );

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-0 md:p-6 max-w-5xl mx-auto">
      <div className="md:flex pb-2 justify-between mb-4">
        <h1 className="text-2xl font-bold pb-2">Event Schedule</h1>
        <div className="flex gap-2">
          {["timeline", "table", "difficultTable"].map((v) => (
            <Button
              key={v}
              onClick={() => setView(v)}
              variant={view === v ? "default" : "outline"}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {view === "timeline" && (
        <ScrollArea>
          <div className="space-y-8 max-h-[80vh] ">
            {Object.entries(eventsGroupedByDate).map(([date, events]) => (
              <div key={date}>
                <h2 className="text-xl font-semibold mb-2">
                  {format(new Date(date), "PPP")}
                </h2>
                <div className="space-y-4">
                  {events.map((event, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Card>
                        <CardContent className="p-4">
                          <h3 className="text-lg font-semibold">
                            {event.title}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {event.time_string}
                          </p>
                          <p className="mt-2 text-sm">{event.description}</p>
                          <p className="text-xs text-gray-400 mt-2">
                            <strong>Category:</strong> {event.category} |{" "}
                            <strong>League:</strong> {event.league}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}

      {view === "table" && (
        <ScrollArea>
          <div className="overflow-x-auto max-h-[80vh]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-20">Date</TableHead>
                  <TableHead className="min-w-20">Time</TableHead>
                  <TableHead className="min-w-20">Title</TableHead>
                  <TableHead className="min-w-40">Description</TableHead>
                  <TableHead className="min-w-20">Category</TableHead>
                  <TableHead className="min-w-20">League</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {eventsByDate.map((event, index) => (
                  <TableRow key={index}>
                    <TableCell>{format(new Date(event.date), "PPP")}</TableCell>
                    <TableCell>{event.time_string}</TableCell>
                    <TableCell>{event.title}</TableCell>
                    <TableCell>{event.description}</TableCell>
                    <TableCell>{event.category}</TableCell>
                    <TableCell>{event.league}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </ScrollArea>
      )}

      {view === "difficultTable" && <DifficultTable />}
    </div>
  );
};

export default ScheduleComponent;
