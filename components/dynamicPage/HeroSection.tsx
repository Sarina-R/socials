"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { HeroSection as HeroSectionType } from "@/app/(dynamicPage)/home3/type";
import React from "react";

interface HeroSectionProps {
  data: HeroSectionType;
  primaryColor: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ data, primaryColor }) => {
  const safePrimaryColor = primaryColor || "#FF0000";

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, delay: 0.4 },
    },
  };

  return (
    <section className="relative w-full h-[80vh] overflow-hidden flex items-center justify-center text-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 1 }}
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${safePrimaryColor}, #2A1B3D 100%)`,
          clipPath: "polygon(0 0, 100% 0, 100% 85%, 0 100%)",
        }}
      >
        <motion.div
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
          className="absolute inset-0 bg-[url(${primaryColor})] bg-cover bg-center opacity-30"
          style={{ backgroundBlendMode: "overlay" }}
        />
      </motion.div>

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="relative z-10 max-w-4xl px-6 py-8 bg-white/5 backdrop-blur-md rounded-3xl border border-[color:var(--primaryColor)]/20 shadow-2xl"
        style={{ "--primaryColor": safePrimaryColor } as React.CSSProperties}
      >
        <div className="text-center">
          <motion.h1
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="text-5xl md:text-6xl font-bold tracking-tight uppercase"
          >
            {data.title}
          </motion.h1>

          <motion.p
            variants={textVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="mt-4 text-xl md:text-2xl font-light"
          >
            {data.description}
          </motion.p>

          <motion.div
            variants={textVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4"
          >
            <div className="bg-white/10 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-md backdrop-blur-sm border border-[color:var(--primaryColor)]/20">
              <span className="text-[color:var(--primaryColor)]">⏳</span>
              <span className="font-semibold">{data.time_string}</span>
            </div>
            <div className="bg-white/10 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-md backdrop-blur-sm border border-[color:var(--primaryColor)]/20">
              <span className="text-[color:var(--primaryColor)]">📍</span>
              <span className="font-semibold">
                {data.city}, {data.country}
              </span>
            </div>
          </motion.div>

          <motion.div
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            className="mt-8 flex flex-col md:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[color:var(--primaryColor)] text-white px-8 py-4 rounded-xl shadow-lg font-semibold hover:bg-[color:var(--primaryColor)]/90 transition-all duration-300"
              style={
                { "--primaryColor": safePrimaryColor } as React.CSSProperties
              }
            >
              Categories
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, rotate: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/20 text-white px-8 py-4 rounded-xl shadow-lg font-semibold hover:bg-white/30 backdrop-blur-sm border border-[color:var(--primaryColor)]/20 transition-all duration-300"
              style={
                { "--primaryColor": safePrimaryColor } as React.CSSProperties
              }
            >
              → Register Now (on AVIS Events)
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Subtle Robot Overlay (Optional, inspired by the screenshot) */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 0.3, x: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute right-0 bottom-0 w-1/3 h-auto"
      >
        <Image
          src={data.bg}
          alt="Robot"
          width={300}
          height={300}
          className="object-contain opacity-50"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
