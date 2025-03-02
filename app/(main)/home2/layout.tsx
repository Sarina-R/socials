"use client";

import { API_URLS } from "@/app/api/url";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { CalendarDays, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export interface EventData {
  name: string;
  poster: string;
  important_dates: Record<string, string>;
  about_event: string;
  country: { name: string; flag_url: string };
  event_dates: { start: string; end: string };
  city: string;
  event_type: string;
  organizers: Organizers[];
}

export interface Organizers {
  name: string;
  logo: string;
}

const navigationLinks = [
  { label: "About Event", href: "#about-event" },
  { label: "Important Dates", href: "#important-dates" },
  { label: "FAQ", href: "#faq" },
  { label: "Leagues", href: "#leagues" },
  { label: "Qualifications", href: "#qualifications" },
  { label: "Guidelines", href: "#guidelines" },
  { label: "Travel", href: "#travel" },
  { label: "Schedule", href: "#schedule" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [eventData, setEventData] = useState<EventData | null>(null);

  useEffect(() => {
    axios
      .get(API_URLS.INFO)
      .then((response) => setEventData(response.data))
      .catch((error) => console.log("Error fetching event data:", error));
  }, []);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Unknown";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <motion.img
        src="https://jamhospital.ir/uploads/en/pages/tehrancity.jpg"
        className="absolute top-0 left-0 -z-50 w-full h-[100vh] object-cover"
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      <div className="h-[75vh] relative">
        <motion.div
          className="p-8 max-w-max bg-neutral-900 bg-opacity-70 rounded-lg flex flex-col items-center gap-3 sm:mb-0 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <h3 className="text-sm font-semibold mb-2 px-3 py-1 rounded-full text-black bg-white">
            Date
          </h3>
          <div className="flex text-white flex-col gap-2">
            <div className="flex items-center gap-2 text-sm">
              <CalendarDays className="w-5 h-5" />
              <span>{formatDate(eventData?.event_dates?.start)}</span>
            </div>
            <Separator className="w-32 bg-white relative bottom-[-1.3rem]" />
            <div className="item-center justify-center z-50 flex">
              <div className="w-6 h-6 bg-white text-black rounded-full">
                <span className="text-xs p-1 font-semibold">To</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CalendarDays className="w-5 h-5" />
              <span>{formatDate(eventData?.event_dates?.end)}</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="absolute bottom-[-3rem] right-0 flex flex-col items-end gap-4"
        >
          <motion.h3
            className="max-w-max mt-6 text-white text-3xl text-right font-extrabold px-4 py-2 rounded-lg shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {eventData?.name ?? "Event Name"}
          </motion.h3>
          <div className="flex p-3 gap-3 justify-center items-center">
            <div className="relative w-9 h-9">
              {eventData?.country?.flag_url && (
                <Image
                  src={eventData.country.flag_url}
                  alt={eventData.country.name}
                  fill
                  className="object-cover rounded-full"
                />
              )}
            </div>
            <span className="flex space-x-1 text-xs items-center font-semibold text-white">
              <MapPin className="w-4 h-4" />
              <p>{eventData?.country?.name ?? "Unknown Country"}</p>
              <p>{eventData?.city ?? "Unknown City"}</p>
            </span>
            <Badge>{eventData?.event_type ?? "Unknown Type"}</Badge>
          </div>
        </motion.div>
      </div>

      <div className="h-[10vh]"></div>

      <div className="sticky top-0 left-0 right-0 z-20 w-full overflow-scroll">
        <motion.div
          className="min-w-max overflow-scroll bg-neutral-100/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-neutral-300 dark:border-neutral-700 shadow-lg"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <nav className="flex flex-wrap justify-center gap-4 md:gap-6 p-4 md:p-6 mx-auto">
            {navigationLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                className="text-xs md:text-sm font-semibold text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white uppercase tracking-wider transform rotate-2 hover:rotate-0 transition-all duration-300"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{
                  scale: 1.1,
                  rotate: 0,
                }}
                whileTap={{ scale: 0.95 }}
              >
                {link.label}
              </motion.a>
            ))}
          </nav>
        </motion.div>
      </div>
      {children}
    </div>
  );
}
