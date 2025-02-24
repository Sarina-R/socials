"use client";

import { API_URLS } from "@/app/api/url";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { EventData } from "./layout";
import Leagues from "../home/(homePageComponents)/Leagues";
import { CalendarDays, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { Card, CardTitle } from "@/components/ui/card";
import Qualification from "./Qualification";
import Schedule from "./Schedule";
import Venue from "./Venue";
import Travel from "./Travel";
import { Skeleton } from "@/components/ui/skeleton";

const faqs = [
  {
    question: "How do you make holy water?",
    answer:
      "You boil the hell out of it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  {
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  {
    question: "What do you call someone with no body and no nose?",
    answer:
      "Nobody knows. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  {
    question: "Why do you never see elephants hiding in trees?",
    answer:
      "Because they're so good at it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
];

const Home2 = () => {
  const [loading, setLoading] = useState(true);
  const [eventData, setEventData] = useState<EventData>();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URLS.INFO);
        setEventData(response.data);
      } catch (error) {
        console.log("Error fetching event data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="lg:space-y-0 space-y-6 p-0 xl:p-6">
        {loading ? (
          <div className="pt-20">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-4 w-full mt-2" />
            <Skeleton className="h-4 w-5/6 mt-2" />
            <Skeleton className="h-4 w-full mt-2" />
            <Skeleton className="h-4 w-5/6 mt-2" />
            <Skeleton className="h-4 w-full mt-2" />
            <Skeleton className="h-4 w-5/6 mt-2" />
            <Skeleton className="h-4 w-full mt-2" />
            <Skeleton className="h-4 w-5/6 mt-2" />
            <div className="flex items-center mt-4 space-x-4">
              <Skeleton className="h-20 w-20 rounded-full" />
              <Skeleton className="h-20 w-20 rounded-full" />
              <Skeleton className="h-20 w-20 rounded-full" />
            </div>
          </div>
        ) : (
          <>
            <div className="col-span-2 space-y-6">
              <div className="p-6 space-y-6 rounded-lg">
                <div className="text-2xl font-bold">About this Event</div>
                <p className="text-neutral-600 dark:text-neutral-300 mt-2">
                  {eventData?.about_event}
                </p>
                <div className="flex items-center">
                  <p className="font-extrabold">Parents</p>
                  <div className="flex sm:px-12">
                    {eventData?.organizers.map((org, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.2, duration: 0.6 }}
                      >
                        <img
                          src={org.logo}
                          alt={org.name}
                          className="w-20 h-20 object-contain"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 justify-center items-center gap-x-4">
              <div className="grid-cols-1 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={eventData?.poster || "/default-poster.jpg"}
                  alt="Event Poster"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="grid-cols-1 text-sm">
                <div className="mx-auto py-10">
                  <div className="space-y-6">
                    <Card className="shadow-lg p-6 rounded-lg">
                      <CardTitle className="text-xl font-semibold">
                        Important Dates
                      </CardTitle>
                      <div className="mt-4 space-y-4">
                        {Object.entries(eventData?.important_dates || {}).map(
                          ([title, date], index) => (
                            <div
                              key={index}
                              className="flex items-center border-l-2 border-neutral-300 dark:border-neutral-600 pl-4"
                            >
                              <div className="relative left-[-1.65rem] bg-neutral-50 dark:bg-neutral-900 rounded-full">
                                <CalendarDays className="w-5 h-5 p-1" />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-sm font-medium ">
                                  {title}
                                </span>
                                <div className="bg-neutral-50 dark:bg-neutral-900 w-full px-3 py-1 rounded-[1rem]">
                                  <p className="text-xs">{date}</p>
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </Card>
                    {faqs.map((faq, index) => (
                      <motion.div
                        key={index}
                        className="rounded-lg shadow-xl overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        <div
                          className="flex justify-between items-center p-4 cursor-pointer transition duration-300 ease-in-out"
                          onClick={() => toggleAccordion(index)}
                        >
                          <h3 className="text-lg font-semibold">
                            {faq.question}
                          </h3>
                          {openIndex === index ? (
                            <ChevronUp className="w-6 h-6 text-neutral-700 dark:text-neutral-300" />
                          ) : (
                            <ChevronDown className="w-6 h-6 text-neutral-700 dark:text-neutral-300" />
                          )}
                        </div>

                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{
                            opacity: openIndex === index ? 1 : 0,
                            height: openIndex === index ? "auto" : 0,
                          }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 text-neutral-700 dark:text-neutral-300">
                            <p>{faq.answer}</p>
                          </div>
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <Leagues />
      <Qualification />
      <Schedule />
      <Venue />
      <Travel />
    </>
  );
};

export default Home2;
