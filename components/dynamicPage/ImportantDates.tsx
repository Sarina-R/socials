"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ImportantDatesSection } from "@/app/(dynamicPage)/home3/type";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { useMDXComponents } from "@/mdx-component";
import { CircleChevronRight, Clock, Pencil } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const linkVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  hover: {
    x: 3,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const chevronVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  hover: {
    x: 8,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
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
    <div className="max-w-6xl m-auto">
      <section className="w-full p-4 flex flex-col md:flex-row gap-8 mx-auto">
        {/* Sticky */}
        <motion.div
          className="md:w-1/3 w-full md:sticky md:top-20 p-6"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="px-4 py-2 font-semibold bg-neutral-100 dark:bg-neutral-900 text-neutral-500 text-sm mb-4 rounded-md max-w-max">
            {data.name}
          </div>
          <h2 className="text-4xl font-semibold text-neutral-600 dark:text-white">
            <MDXRemote
              {...(data.title as MDXRemoteSerializeResult)}
              components={mdxComponents}
            />
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 mt-2">
            <MDXRemote
              {...(data.description as MDXRemoteSerializeResult)}
              components={mdxComponents}
            />
          </p>
        </motion.div>

        {/* Box */}
        <div className="md:w-2/3 w-full flex flex-col gap-6">
          {data.items.map((item, index) => (
            <motion.div
              key={index}
              className="grid grid-cols-2 bg-white dark:bg-neutral-900 rounded-xl shadow-lg py-10 px-6 gap-6 border"
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Left */}
              <div className="flex flex-col justify-between space-y-4">
                <Pencil color={primaryColor} size={45} />
                <div>
                  <h3 className="text-xl font-semibold text-neutral-600 dark:text-white mb-2">
                    <MDXRemote
                      {...(item.title as MDXRemoteSerializeResult)}
                      components={mdxComponents}
                    />
                  </h3>
                  <p className="text-neutral-500 mb-4">
                    <MDXRemote
                      {...(item.description as MDXRemoteSerializeResult)}
                      components={mdxComponents}
                    />
                  </p>
                </div>

                {/* Link */}
                <motion.li
                  className="font-semibold flex items-center space-x-2"
                  variants={linkVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true }}
                  style={{ color: primaryColor }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.a
                    href={item.links.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={linkVariants}
                  >
                    {item.links.text}
                  </motion.a>
                  <motion.div variants={chevronVariants}>
                    <CircleChevronRight size={19} />
                  </motion.div>
                </motion.li>
              </div>

              {/* Right */}
              <div className="flex flex-col justify-between">
                <div className="flex items-center gap-2 mb-4">
                  <Clock size={20} style={{ color: primaryColor }} />
                  <span className="text-neutral-400 dark:text-neutral-600">
                    {new Date(item.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {["Days", "Hours", "Minutes", "Seconds"].map((unit) => (
                    <motion.div
                      key={unit}
                      className="flex flex-col items-center p-4"
                    >
                      <span className="sm:text-3xl text-2xl font-light text-neutral-600 dark:text-neutral-400">
                        {unit === "Days" && countdowns[index].days}
                        {unit === "Hours" && countdowns[index].hours}
                        {unit === "Minutes" && countdowns[index].minutes}
                        {unit === "Seconds" && countdowns[index].seconds}
                      </span>
                      <span className="sm:text-sm text-xs text-neutral-500">
                        {unit}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ImportantDates;
