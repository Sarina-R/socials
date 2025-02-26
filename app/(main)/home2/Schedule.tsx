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
}

export interface League {
  [key: string]: Event[];
}

export interface Category {
  [key: string]: League;
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

  const eventsByDate: Event[] = Object.values(data).reduce<Event[]>(
    (acc, league) => {
      Object.values(league).forEach((events) => {
        acc.push(...events);
      });
      return acc;
    },
    []
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
    <div className="p-0 md:p-6 max-w-4xl mx-auto">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Event Schedule</h1>
        <div className="flex gap-2">
          <Button onClick={() => setView("timeline")} variant="outline">
            Timeline
          </Button>
          <Button onClick={() => setView("table")} variant="outline">
            Table
          </Button>
          <Button onClick={() => setView("difficultTable")} variant="outline">
            DifficultTable
          </Button>
        </div>
      </div>

      {view === "timeline" && (
        <div className="space-y-8">
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
                        <h3 className="text-lg font-semibold">{event.title}</h3>
                        <p className="text-sm text-gray-500">
                          {event.time_string}
                        </p>
                        <p className="mt-2 text-sm">{event.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {view === "table" && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {eventsByDate.map((event, index) => (
              <TableRow key={index}>
                <TableCell>{format(new Date(event.date), "PPP")}</TableCell>
                <TableCell>{event.time_string}</TableCell>
                <TableCell>{event.title}</TableCell>
                <TableCell>{event.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {view === "difficultTable" && <DifficultTable />}
    </div>
  );
};

export default ScheduleComponent;
