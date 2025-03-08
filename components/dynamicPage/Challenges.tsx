"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CategoriesSection } from "@/app/(dynamicPage)/home3/type";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Badge } from "../ui/badge";

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

interface ChallengeProps {
  data: CategoriesSection;
  primaryColor: string;
  name: string;
}

const Challenge: React.FC<ChallengeProps> = ({ data, primaryColor, name }) => {
  return (
    <section className="md:px-32 px-6">
      <div className="flex md:flex-row flex-col-reverse md:items-center justify-between mb-4">
        <h2 className="text-2xl font-bold" style={{ color: primaryColor }}>
          {name} Challenges
        </h2>
        <div
          style={{
            fontSize: "14px",
            background: `linear-gradient(to right, ${primaryColor}20, ${primaryColor}10)`,
            color: primaryColor,
          }}
          className="dark:bg-gradient-to-r px-4 py-1 rounded-lg max-w-max dark:from-[rgba(var(--primary-rgb),0.9)] dark:to-[rgba(var(--primary-rgb),0.6)]"
        >
          {data.title || "About Challenges"}
        </div>
      </div>
      <ScrollArea className="w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          // className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
          className="flex gap-6"
        >
          {data.items.map((category) => (
            <div
              key={category.id}
              className="relative rounded-xl overflow-hidden shadow-lg min-w-52"
            >
              <Link href={`${data.type}${category.id}`} passHref>
                <Image
                  src={category.img}
                  alt={category.name}
                  width={300}
                  height={200}
                  className="w-full h-56 object-cover hover:scale-110 transition-all"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-white/90 dark:bg-black/60 p-3 flex items-center justify-between text-white">
                  <span className="text-lg font-semibold text-black dark:text-white">
                    {category.name}
                  </span>
                  <ExternalLink className="w-5 h-5 text-black dark:text-white" />
                </div>
              </Link>
            </div>
          ))}
        </motion.div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
};

export default Challenge;
