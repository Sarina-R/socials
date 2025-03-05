"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { HeroSection as HeroSectionType } from "@/app/(dynamicPage)/home3/type";
import { Button } from "@/components/ui/button";
import { Calendar, Map } from "lucide-react";
import { MDXRemote } from "next-mdx-remote";
import { useMDXComponents } from "@/mdx-component";

interface HeroSectionProps {
  data: HeroSectionType;
  poster: string;
  primaryColor: string;
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
}) => {
  const safePrimaryColor = primaryColor || "#FF0000";
  const gradientBg = `linear-gradient(to right, rgba(0, 0, 0, 0.7), ${safePrimaryColor}80, ${safePrimaryColor}30), url(${data.bg})`;

  const mdxComponents = useMDXComponents({});

  return (
    <section
      className="w-full min-h-[80vh] flex md:flex-row flex-col items-center justify-center overflow-hidden"
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
        <MDXRemote {...data.title} components={mdxComponents} />
        <motion.div variants={fadeIn}>
          <MDXRemote {...data.description} components={mdxComponents} />
        </motion.div>

        {/* Box */}
        <motion.div
          className="bg-white backdrop-blur-xl rounded-2xl p-6 mb-8 shadow-2xl w-full max-w-lg"
          variants={fadeIn}
        >
          <div className="flex flex-col items-center gap-4 space-y-7">
            <div className="flex flex-col items-center gap-3">
              <Calendar
                size={24}
                style={{ color: safePrimaryColor }}
                strokeWidth={1.5}
              />
              <span
                style={{ color: safePrimaryColor }}
                className="text-[16px] bg-neutral-100 px-4 py-1 rounded-md font-semibold"
              >
                {data.time_string}
              </span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Map
                size={24}
                style={{ color: safePrimaryColor }}
                strokeWidth={1.5}
              />
              <span
                style={{ color: safePrimaryColor }}
                className="text-[16px] bg-neutral-100 px-4 py-1 rounded-md font-semibold"
              >
                {data.city}, {data.country}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mb-8"
          variants={slideIn}
        >
          <Button
            className="bg-[rgba(var(--primary-rgb),1)] hover:bg-[rgba(var(--primary-rgb),0.9)] text-white px-6 py-3 rounded-lg transition-all duration-300 shadow-md"
            style={
              {
                "--primary-rgb": hexToRgb(safePrimaryColor).join(","),
              } as React.CSSProperties
            }
          >
            Categories
          </Button>
          <Button
            className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-6 py-3 rounded-lg transition-all duration-300 shadow-md"
            asChild
          >
            <a href="" target="_blank" rel="noopener noreferrer">
              Register Now (on AVIS Events)
            </a>
          </Button>
        </motion.div>
      </motion.div>

      {/* Poster Image */}
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
  );
};

export default HeroSection;
