"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { HeroSection as HeroSectionType } from "@/app/(dynamicPage)/home3/type";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Map, Menu } from "lucide-react";
import { MDXRemote } from "next-mdx-remote";
import { useMDXComponents } from "@/mdx-component";

interface HeroSectionProps {
  data: HeroSectionType;
  poster: string;
  primaryColor: string;
  btnName?: string;
  btnURL?: string;
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const slideIn = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, delay: 0.2, ease: "easeOut" },
  },
};

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

const HeroSection: React.FC<HeroSectionProps> = ({
  data,
  poster,
  primaryColor,
  btnName,
  btnURL,
}) => {
  const safePrimaryColor = primaryColor || "#FF0000";
  const gradientBg = `linear-gradient(to right, rgba(0, 0, 0, 0.7), ${safePrimaryColor}80, ${safePrimaryColor}30), url(${data.bg})`;

  const mdxComponents = useMDXComponents({});

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="absolute -z-0"
      >
        <path
          fill={safePrimaryColor}
          fill-opacity="1"
          d="M0,128L1440,256L1440,0L0,0Z"
        ></path>
      </svg>
      <section
        className="w-full pt-32 min-h-[80vh] flex md:flex-row flex-col items-center justify-center overflow-hidden"
        style={{
          backgroundImage: gradientBg,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <motion.div
          className="z-10 flex flex-col flex-1 items-start px-4"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="text-4xl font-bold mb-4 text-white">
            <MDXRemote {...data.title} components={mdxComponents} />
          </div>
          <motion.div variants={fadeIn} className="text-lg text-gray-200 mb-6">
            <MDXRemote {...data.description} components={mdxComponents} />
          </motion.div>

          {/* Box */}
          <motion.div
            className="bg-white dark:bg-black/70 backdrop-blur-xl rounded-2xl p-6 mb-8 shadow-2xl w-full max-w-lg"
            variants={fadeIn}
          >
            <div className="flex md:flex-row flex-col items-center justify-center gap-4 md:space-y-0 space-y-7+">
              <div className="flex flex-col items-center justify-center gap-3">
                <Calendar
                  size={24}
                  style={{ color: safePrimaryColor }}
                  strokeWidth={2}
                />
                <span
                  style={{ color: safePrimaryColor }}
                  className="text-[16px] bg-neutral-100 dark:bg-black/70 px-4 py-1 rounded-md font-semibold"
                >
                  {data.time_string}
                </span>
              </div>
              <div className="flex flex-col items-center justify-center gap-3">
                <Map
                  size={24}
                  style={{ color: safePrimaryColor }}
                  strokeWidth={2}
                />
                <span
                  style={{ color: safePrimaryColor }}
                  className="text-[16px] bg-neutral-100 dark:bg-black/70 px-4 py-1 rounded-md font-semibold"
                >
                  {data.city}, {data.country}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Buttons */}
          <motion.div className="flex flex-col gap-4 mb-8" variants={slideIn}>
            <Button
              className="text-lg font-semibold bg-[rgba(var(--primary-rgb),1)] hover:bg-[rgba(var(--primary-rgb),0.9)] text-white px-6 py-6 rounded-lg transition-all duration-300 shadow-md max-w-max"
              style={
                {
                  "--primary-rgb": hexToRgb(safePrimaryColor).join(","),
                } as React.CSSProperties
              }
            >
              <a href="category">
                <span className="flex items-center space-x-2">
                  <Menu />
                  <p>Categories</p>
                </span>
              </a>
            </Button>
            <Button
              className="max-w-max text-lg text-left font-semibold bg-white hover:bg-white/70 text-black px-6 py-6 rounded-lg transition-all duration-300 shadow-md"
              asChild
            >
              <a href="" target="_blank" rel="noopener noreferrer">
                <span className="flex items-center justify-between space-x-2">
                  <ArrowRight />
                  <p>Register Now (on AVIS Events)</p>
                </span>
              </a>
            </Button>
            {btnName && (
              <Button
                className="max-w-max text-lg text-left font-semibold bg-black hover:bg-black/80 text-white py-6 px-6 rounded-lg transition-all duration-300 shadow-md"
                asChild
              >
                <a href={btnURL} target="_blank" rel="noopener noreferrer">
                  <ArrowRight /> {btnName}
                </a>
              </Button>
            )}
          </motion.div>
        </motion.div>

        {/* Poster */}
        {poster && (
          <motion.div
            className="max-w-[280px] sm:max-w-[320px]"
            initial="hidden"
            animate="visible"
            variants={slideIn}
          >
            <Image
              src={poster}
              alt="Event poster"
              width={300}
              height={400}
              className="object-contain drop-shadow-2xl rounded-lg"
            />
          </motion.div>
        )}
      </section>
    </>
  );
};

export default HeroSection;
