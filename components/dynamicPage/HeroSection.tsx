"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { HeroSection as HeroSectionType } from "@/app/(dynamicPage)/home3/type";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Map, Menu } from "lucide-react";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { useMDXComponents1 } from "@/mdx-component";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0 },
  hover: {
    scale: 1.05,
    transition: { duration: 0.3 },
  },
};

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

interface HeroSectionProps {
  data: HeroSectionType;
  poster: string;
  primaryColor: string;
  btnName?: string;
  btnURL?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  data,
  poster,
  primaryColor,
  btnName,
  btnURL,
}) => {
  const safePrimaryColor = primaryColor || "#FF0000";
  const gradientBg = `linear-gradient(to right, rgba(0, 0, 0, 0.8), ${safePrimaryColor}50, ${safePrimaryColor}10), url(${data.bg})`;

  const mdxComponents = useMDXComponents1({});

  return (
    <div className="overflow-hidden relative z-10">
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="absolute lg:top-[-4rem] -z-0"
        initial={{ scaleY: 10 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <path
          fill={safePrimaryColor}
          fillOpacity="1"
          d="M0,128L1440,256L1440,0L0,0Z"
        />
      </motion.svg>

      <motion.section
        className="w-full pt-32 min-h-[80vh] flex md:flex-row flex-col items-center justify-center p-4"
        style={{
          backgroundImage: gradientBg,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="z-10 flex flex-col flex-1 items-start w-full md:px-4">
          <motion.div
            className="sm:text-4xl text-2xl font-bold mb-4 text-white"
            variants={fadeInUp}
          >
            <MDXRemote
              {...(data.title as MDXRemoteSerializeResult)}
              components={mdxComponents}
            />
          </motion.div>

          <motion.div
            className="sm:text-lg text-sm text-gray-200 mb-6"
            variants={fadeInUp}
          >
            <MDXRemote
              {...(data.description as MDXRemoteSerializeResult)}
              components={mdxComponents}
            />
          </motion.div>

          {/* Box */}
          <div className="bg-white dark:bg-black/70 backdrop-blur-xl rounded-2xl p-6 mb-8 shadow-2xl w-full max-w-lg">
            <motion.div
              className="flex md:flex-row flex-col items-center justify-center gap-4"
              variants={containerVariants}
            >
              <motion.div
                variants={fadeInUp}
                className="flex flex-col items-center gap-3"
              >
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
              </motion.div>
              <motion.div
                variants={fadeInUp}
                className="flex flex-col items-center gap-3"
              >
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
              </motion.div>
            </motion.div>
          </div>

          {/* Buttons */}
          <motion.div
            className="flex flex-col gap-4 mb-8"
            variants={containerVariants}
          >
            <motion.div variants={buttonVariants} whileHover="hover">
              <Button
                className="md:text-lg font-semibold bg-[rgba(var(--primary-rgb),1)] hover:bg-[rgba(var(--primary-rgb),0.9)] text-white px-6 py-6 rounded-lg transition-all duration-300 max-w-max"
                style={
                  {
                    "--primary-rgb": hexToRgb(safePrimaryColor).join(","),
                  } as React.CSSProperties
                }
              >
                <a href="#category">
                  <span className="flex items-center space-x-2">
                    <motion.div whileHover={{ x: 5 }}>
                      <Menu />
                    </motion.div>
                    <p>Categories</p>
                  </span>
                </a>
              </Button>
            </motion.div>

            <motion.div variants={buttonVariants} whileHover="hover">
              <Button
                className="max-w-max md:text-lg text-left font-semibold bg-white hover:bg-white/70 text-black px-6 py-6 rounded-lg transition-all duration-300"
                asChild
              >
                <a href="" target="_blank" rel="noopener noreferrer">
                  <span className="flex items-center justify-between space-x-2">
                    <motion.div whileHover={{ x: 5 }}>
                      <ArrowRight />
                    </motion.div>
                    <p>Register Now (on AVIS Events)</p>
                  </span>
                </a>
              </Button>
            </motion.div>

            {btnName && (
              <motion.div variants={buttonVariants} whileHover="hover">
                <Button
                  className="max-w-max md:text-lg text-left font-semibold bg-black hover:bg-black/80 text-white py-6 px-6 rounded-lg transition-all duration-300"
                  asChild
                >
                  <a href={btnURL} target="_blank" rel="noopener noreferrer">
                    <motion.div whileHover={{ x: 5 }}>
                      <ArrowRight />
                    </motion.div>
                    {btnName}
                  </a>
                </Button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>

        {/* Poster */}
        {poster && (
          <div className="max-w-[280px] sm:max-w-[320px]">
            <Image
              src={poster}
              alt="Event poster"
              width={300}
              height={400}
              className="object-contain drop-shadow-2xl rounded-lg"
            />
          </div>
        )}
      </motion.section>
    </div>
  );
};

export default HeroSection;
