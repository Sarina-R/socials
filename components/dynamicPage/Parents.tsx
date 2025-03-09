"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { ParentsSection } from "@/app/(dynamicPage)/home3/type";
import Link from "next/link";

interface ParentsProps {
  data: ParentsSection;
  primaryColor?: string;
}

const Parents = ({ data, primaryColor }: ParentsProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Animation variants
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

  const titleVariants = {
    hidden: { opacity: 0, y: -40, scale: 0.85 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.9], // Elastic bounce
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60, rotate: 5, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      scale: 1,
      transition: {
        duration: 0.9,
        ease: "easeOut",
        type: "spring",
        bounce: 0.35,
      },
    },
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible" // Triggers when section is in view
      viewport={{ once: true, amount: 0.2 }} // Runs once when 20% visible
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 space-y-12">
        {data.items.map((category, categoryIndex) => (
          <div key={categoryIndex}>
            <motion.h2
              className="text-3xl font-bold text-center mb-4"
              style={{ color: primaryColor }}
              variants={titleVariants}
            >
              {category.name}
            </motion.h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-6 justify-center">
              {category.items.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible" // Triggers individually for each item
                  viewport={{ once: true, amount: 0.3 }} // Runs once when 30% of item is visible
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="flex justify-center"
                >
                  {item.link ? (
                    <Link href={item.link} target="_blank" passHref>
                      <Image
                        src={item.logo}
                        alt={`${category.name} ${item.id}`}
                        width={150}
                        height={150}
                        className="object-contain max-h-16 w-auto"
                        style={{
                          opacity:
                            hoveredIndex === null || hoveredIndex === index
                              ? 1
                              : 0.5,
                          transition: "opacity 0.3s ease-in-out",
                        }}
                      />
                    </Link>
                  ) : (
                    <Image
                      src={item.logo}
                      alt={`${category.name} ${item.id}`}
                      width={150}
                      height={150}
                      className="object-contain max-h-16 w-auto"
                      style={{
                        opacity:
                          hoveredIndex === null || hoveredIndex === index
                            ? 1
                            : 0.5,
                        transition: "opacity 0.3s ease-in-out",
                      }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default Parents;
