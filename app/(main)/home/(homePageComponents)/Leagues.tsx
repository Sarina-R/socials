"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { API_URLS } from "@/app/api/url";
import Image from "next/image";
import axios from "axios";

interface EventData {
  title: string;
  category: string[];
  image: string;
  registrationStatus: "Open" | "Closed";
}

interface EventGroups {
  [key: string]: EventData[];
}

const Leagues = () => {
  const [loading, setLoading] = useState(true);
  const [eventGroups, setEventGroups] = useState<EventGroups>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URLS.LEAGUES);
        setEventGroups(response.data);
      } catch (error) {
        console.error("Error fetching event data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSmoothScroll = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (loading) {
    return (
      <ScrollArea className="w-full overflow-x-auto">
        <div className="flex space-x-6 p-6">
          {[...Array(3)].map((_, index) => (
            <motion.div
              key={index}
              className="w-72 p-6 space-y-4 bg-neutral-900 rounded-xl shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              <Skeleton className="w-full h-40 rounded-lg bg-neutral-800 animate-[pulse_1.5s_infinite]" />
              <Skeleton className="h-8 w-3/4 bg-neutral-800 animate-[pulse_1.5s_infinite]" />
              <Skeleton className="h-5 w-1/2 bg-neutral-800 animate-[pulse_1.5s_infinite]" />
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    );
  }

  return (
    <div className="space-y-8">
      <motion.div
        className="flex gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {Object.keys(eventGroups).map((groupName, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Badge
              onClick={() => handleSmoothScroll(groupName)}
              className="cursor-pointer px-4 py-2 rounded-full shadow-md hover:bg-neutral-700 transition-all duration-300"
            >
              {groupName}
            </Badge>
          </motion.div>
        ))}
      </motion.div>

      {/* Event Groups with Staggered Animations */}
      {Object.keys(eventGroups).map((groupName, index) => (
        <motion.div
          key={index}
          id={groupName}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: index * 0.2 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-3xl font-bold tracking-tight"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {groupName}
          </motion.h2>
          <ScrollArea className="w-full overflow-x-auto">
            <div className="flex space-x-6 p-4">
              {eventGroups[groupName].map((event, idx) => (
                <motion.div
                  key={idx}
                  className="w-72 p-6 dark:bg-neutral-900 rounded-xl shadow border border-neutral-100 dark:border-neutral-800"
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  whileHover={{
                    y: 0,
                    rotate: 2,
                  }}
                >
                  <div className="relative w-full h-40 overflow-hidden rounded-lg">
                    <motion.div
                      className="absolute inset-0"
                      whileHover={{ scale: 1.1, rotate: -3 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Image
                        src={event.image}
                        alt={event.title}
                        layout="fill"
                        objectFit="cover"
                        className="transition-all duration-500"
                      />
                    </motion.div>
                  </div>

                  <motion.h3
                    className="text-xl font-semibold mt-4 "
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.2 + 0.3, duration: 0.5 }}
                  >
                    {event.title.split("").map((char, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: idx * 0.2 + i * 0.03 }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </motion.h3>

                  <p className="text-sm text-neutral-400 mt-2">{groupName}</p>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {event.category.map((cat, catIdx) => (
                      <motion.div
                        key={catIdx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.2 + catIdx * 0.1 }}
                      >
                        <Badge className="bg-neutral-800  px-3 py-1 rounded-full hover:bg-neutral-700 transition-all duration-300">
                          {cat}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    className="text-sm mt-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.2 + 0.4 }}
                  >
                    <span className="font-semibold text-neutral-600 dark:text-neutral-300">
                      Registration:{" "}
                    </span>
                    <motion.span
                      className={`${
                        event.registrationStatus === "Open"
                          ? ""
                          : "text-neutral-500"
                      }`}
                      animate={
                        event.registrationStatus === "Open"
                          ? { scale: [1, 1.1, 1] }
                          : {}
                      }
                      transition={
                        event.registrationStatus === "Open"
                          ? { duration: 1, repeat: Infinity }
                          : {}
                      }
                    >
                      {event.registrationStatus}
                    </motion.span>
                  </motion.div>

                  <div className="flex gap-3 mt-4">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button variant="outline" className="">
                        View Teams
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button className=" bg-black  dark:bg-white dark:text-black">
                        Register
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </motion.div>
      ))}
    </div>
  );
};

export default Leagues;
