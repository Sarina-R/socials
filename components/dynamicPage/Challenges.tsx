"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CategoriesSection } from "@/app/(dynamicPage)/home3/type";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

interface ChallengeProps {
  data: CategoriesSection;
  primaryColor: string;
  name: string;
}

const Challenge: React.FC<ChallengeProps> = ({ data, primaryColor, name }) => {
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
        ease: [0.6, -0.05, 0.01, 0.9],
      },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, x: 50, rotate: 10 },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60, rotate: 5 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        duration: 0.9,
        ease: "easeOut",
        type: "spring",
        bounce: 0.35,
      },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const linkIconVariants = {
    hidden: { opacity: 0, scale: 0.7 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      className="md:px-32 px-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="flex md:flex-row flex-col-reverse md:items-center justify-between mb-4">
        <motion.h2
          className="text-2xl font-bold"
          style={{ color: primaryColor }}
          variants={titleVariants}
        >
          {name} Challenges
        </motion.h2>
        <motion.div
          style={{
            fontSize: "14px",
            background: `linear-gradient(to right, ${primaryColor}20, ${primaryColor}10)`,
            color: primaryColor,
          }}
          className="dark:bg-gradient-to-r px-4 py-1 rounded-lg max-w-max dark:from-[rgba(var(--primary-rgb),0.9)] dark:to-[rgba(var(--primary-rgb),0.6)]"
          variants={badgeVariants}
        >
          {data.title || "About Challenges"}
        </motion.div>
      </div>
      <ScrollArea className="w-full overflow-hidden overflow-x-auto">
        <div className="flex gap-6 h-full overflow-hidden">
          {data.items.map((category) => (
            <motion.div
              key={category.id}
              className="relative rounded-xl overflow-hidden shadow-sm min-w-52"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <Link href={`/home3/categories/${category.id}`} passHref>
                <div className="relative">
                  <Image
                    src={category.img}
                    alt={category.name}
                    width={300}
                    height={200}
                    className="w-full h-56 object-cover"
                    style={{ maxHeight: "100%" }}
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 bg-white/90 dark:bg-black/60 p-3 flex items-center justify-between text-white"
                    variants={overlayVariants}
                  >
                    <span className="text-lg font-semibold text-black dark:text-white">
                      {category.name}
                    </span>
                    <motion.div variants={linkIconVariants}>
                      <ExternalLink className="w-5 h-5 text-black dark:text-white" />
                    </motion.div>
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </motion.section>
  );
};

export default Challenge;
