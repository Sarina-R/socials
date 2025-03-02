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
    <div className="relative min-h-screen p-0 xl:p-8 overflow-hidden">
      {loading ? (
        <div className="pt-24 relative z-10">
          <div className="h-8 w-48 bg-neutral-200 rounded-lg mb-4 animate-[pulse_1.5s_ease-in-out_infinite]" />
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`h-4 ${
                  i % 2 === 0 ? "w-full" : "w-5/6"
                } bg-neutral-200 rounded transform transition-all duration-1000 hover:scale-105 hover:skew-x-2`}
              />
            ))}
          </div>
          <div className="flex items-center mt-6 gap-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-20 w-20 bg-neutral-200 rounded-full animate-[spin_2s_linear_infinite] hover:animate-none hover:scale-110 transition-all"
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto relative">
          <section className="mb-12 relative">
            <div className="mt-8">
              <TextBox
                title={"About This Event"}
                img={eventData?.poster}
                text={eventData?.about_event || ""}
                html={false}
              />
              <div className="md:p-6 p-2">
                <span className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
                  Organized by
                </span>
                <div className="flex gap-8 mt-6">
                  {eventData?.organizers.map((org, index) => (
                    <motion.div
                      key={index}
                      className="relative group cursor-pointer"
                      whileHover={{ y: -10, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <img
                        src={org.logo}
                        alt={org.name}
                        className="w-20 h-20 object-contain"
                      />
                      <motion.div
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-4 px-4 py-2 rounded-lg text-white text-sm opacity-0 group-hover:opacity-100"
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {org.name}
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <div className="grid lg:grid-cols-[4fr_5fr] gap-8">
            <motion.div
              className="relative group rounded-3xl overflow-hidden shadow-lg border"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Image
                src={eventData?.poster || "/default-poster.jpg"}
                alt="Event Poster"
                width={800}
                height={600}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
              />
            </motion.div>

            <div className="space-y-6">
              <motion.div
                className="rounded-3xl p-8 bg-gradient-to-br backdrop-blur-lg border"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-3xl font-bold mb-6">Important Dates</h3>
                <div className="grid gap-4">
                  {Object.entries(eventData?.important_dates || {}).map(
                    ([title, date], index) => (
                      <motion.div
                        key={index}
                        className="group relative p-4 rounded-xl hover:bg-neutral-50/70 dark:hover:bg-neutral-900/70 transition-all duration-300 transform-gpu"
                        whileHover={{ rotateY: 10, scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="flex items-center gap-4">
                          <motion.div
                            className="w-12 h-12 rounded-full bg-black dark:bg-white flex items-center justify-center"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                          >
                            <CalendarDays className="w-6 h-6 text-white dark:text-black" />
                          </motion.div>
                          <div>
                            <h4 className="font-medium">{title}</h4>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                              {date}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )
                  )}
                </div>
              </motion.div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="rounded-3xl shadow-lg overflow-hidden group"
                    whileHover={{ y: -5 }}
                  >
                    <button
                      className="w-full flex justify-between items-center p-5 text-left transition-all duration-300 group-hover:bg-neutral-50 dark:group-hover:bg-neutral-800"
                      onClick={() => toggleAccordion(index)}
                    >
                      <h3 className="font-semibold">{faq.question}</h3>
                      <motion.div
                        animate={{ rotate: openIndex === index ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="relative"
                      >
                        <ChevronDown className="w-5 h-5 transform group-hover:scale-125 transition-transform" />
                      </motion.div>
                    </button>
                    <motion.div
                      initial={false}
                      animate={{
                        height: openIndex === index ? "auto" : 0,
                        opacity: openIndex === index ? 1 : 0,
                      }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden relative"
                    >
                      <div className="px-5 pb-5 text-neutral-600 dark:text-neutral-300 transform hover:skew-x-2 transition-transform">
                        {faq.answer}
                      </div>
                      <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-700 opacity-0 group-hover:opacity-10 transition-opacity" />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 space-y-12">
            <Leagues />
            <TextBox
              title="Qualification"
              text={text}
              img={eventData?.poster}
              html={true}
            />
            <Schedule />
            <TextBox
              title="Qualification"
              text={text}
              img={eventData?.poster}
              html={true}
            />
            <RegistrationTable />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home2;
