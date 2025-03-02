"use client";

import { API_URLS } from "@/app/api/url";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { EventData } from "./layout";
import Leagues from "../home/(homePageComponents)/Leagues";
import { CalendarDays, ChevronDown } from "lucide-react";
import Image from "next/image";
import Schedule from "./Schedule";
import RegistrationTable from "./RegistrationTable";
import TextBox from "@/components/schedule/TextBox";

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
  const [text, setText] = useState<string>("");

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URLS.QUALIFICATION);
        setText(response.data.text);
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="relative min-h-screen p-0 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full bg-[url('/grid-pattern.png')] bg-[size:60px_60px] opacity-10 animate-[float_20s_infinite_ease-in-out]" />
      </div>

      {loading ? (
        <div className="pt-16 pl-4 md:pl-8 relative z-10 flex flex-wrap gap-6 md:gap-8">
          <motion.div
            className="h-8 w-40 md:w-48 bg-neutral-700 dark:bg-neutral-300 rounded-lg animate-[pulse_1.5s_infinite]"
            initial={{ rotate: -5 }}
          />
          <div className="space-y-4 flex-1 min-w-[200px]">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className={`h-4 ${
                  i % 2 === 0 ? "w-3/4" : "w-1/2"
                } bg-neutral-700 dark:bg-neutral-300 rounded transform`}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
                whileHover={{ scale: 1.05, skewX: 5 }}
              />
            ))}
          </div>
          <div className="flex gap-4 md:gap-6 flex-wrap">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="h-16 w-16 md:h-20 md:w-20 bg-neutral-700 dark:bg-neutral-300 rounded-full"
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                whileHover={{ scale: 1.1, rotate: 0 }}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="relative z-10 p-4 md:p-8 mx-auto max-w-none space-y-8">
          <div className="flex flex-col gap-8 md:gap-12">
            <div className="flex flex-wrap gap-6 md:gap-10 items-start justify-around">
              <motion.div
                className="w-full md:w-[30%] relative group rounded-2xl overflow-hidden shadow-xl border border-neutral-700 dark:border-neutral-300 transform rotate-6 md:rotate-8 order-1"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                whileHover={{ scale: 1.05, rotate: 0 }}
              >
                <Image
                  src={eventData?.poster || "/default-poster.jpg"}
                  alt="Event Poster"
                  width={400}
                  height={250}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                />
              </motion.div>

              {/* About */}
              <motion.div
                className="w-full md:w-[65%] transform -rotate-5 md:-rotate-7 order-2"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="rounded-2xl p-4 md:p-6 bg-neutral-100/50 dark:bg-neutral-800/50 backdrop-blur-md border border-neutral-300 dark:border-neutral-700 max-h-[400px] overflow-y-auto">
                  <TextBox
                    title="About This Event"
                    img={eventData?.poster}
                    text={eventData?.about_event || ""}
                    html={false}
                  />
                </div>
                <div className="flex flex-wrap gap-4 md:gap-6 mt-4 pl-2 md:pl-4">
                  <span className="text-xs md:text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 rotate-6">
                    Organized by
                  </span>
                  {eventData?.organizers.map((org, index) => (
                    <motion.div
                      key={index}
                      className="relative group cursor-pointer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{
                        y: -10,
                        rotate: index % 2 === 0 ? 15 : -15,
                      }}
                    >
                      <img
                        src={org.logo}
                        alt={org.name}
                        className="w-12 h-12 md:w-16 md:h-16 object-contain"
                      />
                      <motion.div
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-neutral-800 dark:bg-neutral-200 text-white dark:text-black text-xs rounded-full opacity-0 group-hover:opacity-100"
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {org.name}
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[40%_55%] gap-6 md:gap-10 items-start">
              {/* Important Dates */}
              <motion.div
                className="transform rotate-4 md:rotate-6 order-2 md:order-1"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="rounded-2xl p-4 md:p-6 bg-neutral-100/50 dark:bg-neutral-800/50 backdrop-blur-md border border-neutral-300 dark:border-neutral-700">
                  <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white mb-4">
                    Important Dates
                  </h3>
                  <div className="flex flex-wrap gap-3 md:gap-4">
                    {Object.entries(eventData?.important_dates || {}).map(
                      ([title, date], index) => (
                        <motion.div
                          key={index}
                          className={`group p-3 w-full md:p-4 rounded-xl bg-neutral-200/70 dark:bg-neutral-900/70 hover:bg-neutral-300/70 dark:hover:bg-neutral-800/70 transition-all duration-300 transform rotate-[${
                            index * 10
                          }deg]`}
                          initial={{
                            opacity: 0,
                            x: index % 2 === 0 ? -50 : 50,
                          }}
                          animate={{ opacity: 1, x: 0 }}
                          whileHover={{ rotate: 0, scale: 1.1 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex items-center gap-2 md:gap-3">
                            <motion.div
                              className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-black dark:bg-white flex items-center justify-center"
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.5 }}
                            >
                              <CalendarDays className="w-4 h-4 md:w-5 md:h-5 text-white dark:text-black" />
                            </motion.div>
                            <div>
                              <h4 className="font-medium text-black dark:text-white text-sm md:text-base">
                                {title}
                              </h4>
                              <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400">
                                {date}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )
                    )}
                  </div>
                </div>
              </motion.div>

              {/* FAQs - Tall Scrollable Column */}
              <motion.div
                className="transform -rotate-6 md:-rotate-9 order-1 md:order-2"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="rounded-2xl p-4 md:p-6 bg-neutral-100/50 dark:bg-neutral-800/50 backdrop-blur-md border border-neutral-300 dark:border-neutral-700 max-h-[500px] overflow-y-auto">
                  {faqs.map((faq, index) => (
                    <motion.div
                      key={index}
                      className="rounded-xl shadow-lg overflow-hidden group mb-4"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -5, rotate: 0 }}
                    >
                      <button
                        className="w-full flex justify-between items-center p-3 md:p-4 text-left bg-neutral-200/70 dark:bg-neutral-800/70 hover:bg-neutral-300/70 dark:hover:bg-neutral-700/70 transition-all duration-300"
                        onClick={() => toggleAccordion(index)}
                      >
                        <h3 className="font-semibold text-black dark:text-white text-sm md:text-base">
                          {faq.question}
                        </h3>
                        <motion.div
                          animate={{ rotate: openIndex === index ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-black dark:text-white group-hover:scale-125" />
                        </motion.div>
                      </button>
                      <motion.div
                        initial={false}
                        animate={{
                          height: openIndex === index ? "auto" : 0,
                          opacity: openIndex === index ? 1 : 0,
                        }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden bg-neutral-100/70 dark:bg-neutral-900/70"
                      >
                        <div className="px-3 md:px-4 pb-3 md:pb-4 text-neutral-600 dark:text-neutral-300 text-sm">
                          {faq.answer}
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="flex flex-wrap gap-6 md:gap-10 justify-between items-start">
              {/* Leagues */}
              <motion.div
                className="w-full md:w-[60%] transform -rotate-8 md:-rotate-10 order-2 md:order-1"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Leagues />
              </motion.div>

              {/* 2Texts + Registration */}
              <motion.div
                className="w-full md:w-[35%] transform rotate-5 md:rotate-7 order-1 space-y-8 md:order-2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
              >
                <div className="rounded-2xl p-4 md:p-6 bg-neutral-100/50 dark:bg-neutral-800/50 backdrop-blur-md border border-neutral-300 dark:border-neutral-700 max-h-[300px] overflow-y-auto">
                  <TextBox
                    title="Qualification"
                    text={text}
                    img={eventData?.poster}
                    html={true}
                  />
                </div>

                <motion.div
                  className="w-full transform -rotate-7 md:-rotate-9"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <RegistrationTable />
                </motion.div>
                <div className="rounded-2xl p-4 md:p-6 bg-neutral-100/50 dark:bg-neutral-800/50 backdrop-blur-md border border-neutral-300 dark:border-neutral-700 max-h-[300px] overflow-y-auto">
                  <TextBox
                    title="Travel"
                    text={text}
                    img={eventData?.poster}
                    html={true}
                  />
                </div>
              </motion.div>
            </div>
          </div>

          {/* DifficultTable ... */}
          <motion.div
            className="w-full transform rotate-3 md:rotate-5"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Schedule />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Home2;
