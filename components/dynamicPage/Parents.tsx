"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { ParentsSection } from "@/app/(dynamicPage)/home3/type";

interface ParentsProps {
  data: ParentsSection;
  primaryColor?: string;
}

const Parents = ({ data, primaryColor }: ParentsProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section>
      <div className="container mx-auto px-4 space-y-12">
        {data.items.map((category, categoryIndex) => (
          <div key={categoryIndex}>
            <h2
              className="text-3xl font-bold text-center mb-4"
              style={{ color: primaryColor }}
            >
              {category.name}
            </h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-6 justify-center">
              {category.items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="flex justify-center"
                >
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
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Parents;
