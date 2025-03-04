"use client";

import { useState, useEffect } from "react";
import { format, isToday, parseISO } from "date-fns";
import axios from "axios";
import { motion } from "framer-motion";
import { API_URLS } from "@/app/api/url";
import DifficultTable from "@/components/home/schedule/DifficultTable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";

export interface Event {
  id: number;
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

  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedLeague, setSelectedLeague] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [showToday, setShowToday] = useState<boolean>(false);

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
      Object.entries(leagues || {}).flatMap(([league, events]) =>
        Array.isArray(events)
          ? events.map((event) => ({ ...event, category, league }))
          : []
      )
  );
  const filteredEvents = eventsByDate.filter((event) => {
    const eventDate = parseISO(event.date);

    return (
      (!selectedDate || format(eventDate, "yyyy-MM-dd") === selectedDate) &&
      (selectedLeague === "all" ||
        !selectedLeague ||
        event.league === selectedLeague) &&
      (selectedCategory === "all" ||
        !selectedCategory ||
        event.category === selectedCategory) &&
      (!showToday || isToday(eventDate))
    );
  });

  const groupedEvents = filteredEvents.reduce<
    Record<string, Record<string, Event[]>>
  >((acc, event) => {
    if (!acc[event.category]) {
      acc[event.category] = {};
    }
    if (!acc[event.category][event.league]) {
      acc[event.category][event.league] = [];
    }
    acc[event.category][event.league].push(event);
    return acc;
  }, {});

  const categories = [...new Set(eventsByDate.map((event) => event.category))];
  const leagues = [...new Set(eventsByDate.map((event) => event.league))];

  if (loading)
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin text-neutral-500" size={32} />
      </div>
    );

  return (
    <div className="p-0 md:p-6 max-w-5xl mx-auto space-y-4">
      <div className="md:flex pb-4 justify-between items-center">
        <h1 className="text-3xl mb-4 font-bold">Event Schedule</h1>
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
      <div className="grid grid-cols-1 mb-4 lg:grid-cols-4 gap-4 bg-neutral-50 dark:bg-neutral-900 p-4 rounded-xl">
        <Input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="text-black dark:text-white"
        />

        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category, index) => (
              <SelectItem key={index} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedLeague} onValueChange={setSelectedLeague}>
          <SelectTrigger>
            <SelectValue placeholder="Select League" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Leagues</SelectItem>
            {leagues.map((league, index) => (
              <SelectItem key={index} value={league}>
                {league}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center justify-between p-2 rounded-md shadow-sm">
          <span className="text-sm">Today&apos;s Events</span>
          <Switch checked={showToday} onCheckedChange={setShowToday} />
        </div>
      </div>

      {view === "timeline" && (
        <ScrollArea>
          <div className="space-y-8 max-h-[80vh] ">
            {filteredEvents.length === 0 ? (
              <p className="text-center text-neutral-500">No events found.</p>
            ) : (
              Object.entries(
                filteredEvents.reduce<Record<string, Event[]>>((acc, event) => {
                  acc[event.date] = acc[event.date] || [];
                  acc[event.date].push(event);
                  return acc;
                }, {})
              ).map(([date, events]) => (
                <div
                  key={date}
                  className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg shadow-md"
                >
                  <h2 className="text-xl font-semibold">
                    {format(new Date(date), "PPP")}
                  </h2>
                  <div className="space-y-4 mt-2">
                    {events.map((event, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Card className="shadow-sm hover:shadow-lg transition">
                          <CardContent className="p-4">
                            <h3 className="text-lg font-semibold">
                              {event.title}
                            </h3>
                            <p className="text-sm text-neutral-500">
                              {event.time_string}
                            </p>
                            <p className="mt-2 text-sm">{event.description}</p>
                            <p className="text-xs text-neutral-400 mt-2">
                              <strong>Category:</strong> {event.category} |{" "}
                              <strong>League:</strong> {event.league}
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      )}

      {view === "table" && (
        <motion.div
          className="overflow-auto max-h-[80vh] w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-20">Category</TableHead>
                <TableHead className="min-w-28">League</TableHead>
                <TableHead className="min-w-32">Date</TableHead>
                <TableHead className="min-w-32">Time</TableHead>
                <TableHead className="min-w-20">Title</TableHead>
                <TableHead className="min-w-52">Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.map((event, index) => (
                <TableRow key={index}>
                  <TableCell>{event.category}</TableCell>
                  <TableCell>{event.league}</TableCell>
                  <TableCell>{format(new Date(event.date), "PPP")}</TableCell>
                  <TableCell>{event.time_string}</TableCell>
                  <TableCell>{event.title}</TableCell>
                  <TableCell>{event.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </motion.div>
      )}
      {view === "difficultTable" && <DifficultTable events={groupedEvents} />}
    </div>
  );
};

export default ScheduleComponent;
