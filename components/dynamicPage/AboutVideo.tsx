"use client";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { AboutSection } from "@/app/(dynamicPage)/home3/type";
import { useMDXComponents } from "@/mdx-component";
import { CircleChevronRight, Earth } from "lucide-react";
import { motion } from "framer-motion";

interface AboutVideoProps {
  data: AboutSection;
  primaryColor?: string;
}

const AboutVideo = ({ data, primaryColor }: AboutVideoProps) => {
  const isReversed = data.reverse || false;
  const mdxComponents = useMDXComponents({});

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

  const textBlockVariants = {
    hidden: { opacity: 0, x: isReversed ? 50 : -50, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.9],
      },
    },
  };

  const videoVariants = {
    hidden: { opacity: 0, y: 100, rotate: -5 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
        type: "spring",
        bounce: 0.4,
      },
    },
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

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="overflow-x-hidden px-6"
    >
      <div className="container mx-auto px-4 flex flex-col md:flex-row md:items-center justify-between gap-8">
        <motion.div
          className={`md:w-1/2 ${isReversed ? "md:order-2" : "md:order-1"}`}
          variants={textBlockVariants}
        >
          <motion.h2
            className="text-sm flex md:items-center text-neutral-500 mb-3"
            variants={textBlockVariants}
          >
            <Earth className="mr-3" color={primaryColor} />
            {data.name}
          </motion.h2>
          <motion.h3
            className="text-3xl mb-4 text-neutral-600 dark:text-neutral-400"
            variants={textBlockVariants}
          >
            <MDXRemote
              {...(data.title as MDXRemoteSerializeResult)}
              components={mdxComponents}
            />
          </motion.h3>
          {data.links && (
            <ul className="space-y-2">
              {data.links.map((link, index) => (
                <motion.li
                  key={index}
                  className="font-semibold md:items-center flex space-x-2"
                  variants={linkVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true }}
                  style={{ color: primaryColor }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.a
                    href={link.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={linkVariants}
                  >
                    {link.title}
                  </motion.a>
                  <motion.div variants={chevronVariants}>
                    <CircleChevronRight size={19} />
                  </motion.div>
                </motion.li>
              ))}
            </ul>
          )}
        </motion.div>
        <motion.div
          className={`md:w-1/2 ${isReversed ? "md:order-1" : "md:order-2"}`}
          variants={videoVariants}
        >
          {data.video && (
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full flex justify-center md:items-center rounded-xl shadow-lg overflow-hidden aspect-video min-w-max md:min-w-max sm:min-w-[500px]"
            >
              <iframe
                src={data.video}
                title={data.name}
                className="w-full h-full rounded-xl object-cover"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AboutVideo;
