"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ImportantDatesSection } from "@/app/(dynamicPage)/home3/type";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { useMDXComponents } from "@/mdx-component";
import { Calendar } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const zoomIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface ImportantDatesProps {
  data: ImportantDatesSection;
  primaryColor: string;
}

const ImportantDates: React.FC<ImportantDatesProps> = ({
  data,
  primaryColor,
}) => {
  const mdxComponents = useMDXComponents({});

  const [countdowns, setCountdowns] = useState<Countdown[]>(
    data.items.map(() => ({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    }))
  );

  useEffect(() => {
    const timers = data.items.map((item) => {
      const targetDate = new Date(item.date).getTime();
      return setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
          setCountdowns((prev) =>
            prev.map((countdown, idx) =>
              idx === data.items.indexOf(item)
                ? { days: 0, hours: 0, minutes: 0, seconds: 0 }
                : countdown
            )
          );
          clearInterval(timers[data.items.indexOf(item)]);
          return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setCountdowns((prev) =>
          prev.map((countdown, idx) =>
            idx === data.items.indexOf(item)
              ? { days, hours, minutes, seconds }
              : countdown
          )
        );
      }, 1000);
    });

    return () => timers.forEach((timer) => clearInterval(timer));
  }, [data.items]);

  return (
    <section className="w-full py-12 flex flex-col md:flex-row gap-8">
      {/* Sticky Sidebar */}
      <motion.div
        className="md:w-1/4 w-full md:sticky md:top-20 p-6"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          <MDXRemote
            {...(data.title as MDXRemoteSerializeResult)}
            components={mdxComponents}
          />
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          <MDXRemote
            {...(data.description as MDXRemoteSerializeResult)}
            components={mdxComponents}
          />
        </p>
      </motion.div>

      {/* Countdown Items */}
      <div className="md:w-3/4 w-full flex flex-col gap-6">
        {data.items.map((item, index) => (
          <motion.div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center"
            initial="hidden"
            animate="visible"
            variants={zoomIn}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Header with Icon and Date */}
            <div className="flex items-center justify-between w-full mb-4">
              <div className="flex items-center gap-2">
                <Calendar size={20} style={{ color: primaryColor }} />
                <span className="text-gray-600 dark:text-gray-400">
                  {new Date(item.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>

            {/* Title and Description */}
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              <MDXRemote
                {...(item.title as MDXRemoteSerializeResult)}
                components={mdxComponents}
              />
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
              <MDXRemote
                {...(item.description as MDXRemoteSerializeResult)}
                components={mdxComponents}
              />
            </p>

            {/* Countdown Timer */}
            <div className="flex gap-4 mb-6">
              {["Days", "Hours", "Minutes", "Seconds"].map((unit, idx) => (
                <motion.div
                  key={unit}
                  className="flex flex-col items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-4"
                  animate={{
                    scale: [1, 1.1, 1],
                    transition: {
                      repeat: Infinity,
                      duration: 1,
                      delay: idx * 0.2,
                    },
                  }}
                >
                  <span className="text-3xl font-bold text-gray-800 dark:text-white">
                    {unit === "Days" && countdowns[index].days}
                    {unit === "Hours" && countdowns[index].hours}
                    {unit === "Minutes" && countdowns[index].minutes}
                    {unit === "Seconds" && countdowns[index].seconds}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {unit}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Link */}
            <a
              href={item.links.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-500 font-semibold hover:underline"
            >
              {item.links.text} →
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ImportantDates;
