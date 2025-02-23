"use client";

import { API_URLS } from "@/app/api/url";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { EventData } from "./layout";
import Leagues from "../home/(homePageComponents)/Leagues";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";

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

  if (loading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  return (
    <>
      <div className="lg:space-y-0 space-y-6 p-0 xl:p-6">
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

        <div className="grid lg:grid-cols-2 justify-center items-center gap-x-4 space-y-6">
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
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    className="rounded-lg shadow-xl overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <div
                      className="flex justify-between items-center p-5 cursor-pointer transition duration-300 ease-in-out"
                      onClick={() => toggleAccordion(index)}
                    >
                      <h3 className="text-lg font-semibold">{faq.question}</h3>
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
                      <div className="p-5 text-neutral-700 dark:text-neutral-300">
                        <p>{faq.answer}</p>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Leagues />
    </>
  );
};

export default Home2;
