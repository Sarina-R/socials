"use client";

import Image from "next/image";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { AboutSection } from "@/app/(dynamicPage)/home3/type";
import { useMDXComponents } from "@/mdx-component";
import { CircleChevronRight, Earth } from "lucide-react";

interface AboutImageProps {
  data: AboutSection;
  primaryColor?: string;
}

const AboutImage = ({ data, primaryColor }: AboutImageProps) => {
  const isReversed = data.reverse || false;

  const mdxComponents = useMDXComponents({});

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className={`md:w-1/2 ${isReversed ? "md:order-2" : "md:order-1"}`}>
          <h2 className="text-sm flex items-center text-neutral-500 mb-3">
            <Earth className="mr-3" color={primaryColor} /> {data.name}
          </h2>
          <h3 className="text-3xl mb-4 text-neutral-600 dark:text-neutral-400">
            <MDXRemote
              {...(data.title as MDXRemoteSerializeResult)}
              components={mdxComponents}
            />
          </h3>
          {data.description && (
            <div className="text-neutral-500 leading-relaxed mb-4">
              <MDXRemote
                {...(data.description as MDXRemoteSerializeResult)}
                components={mdxComponents}
              />
            </div>
          )}
          {data.links && (
            <ul className="space-y-2">
              {data.links.map((link, index) => (
                <li
                  className="font-semibold items-center flex space-x-2 hover:space-x-4"
                  key={index}
                  style={{ color: primaryColor }}
                >
                  <a href={link.link} target="_blank" rel="noopener noreferrer">
                    {link.title}
                  </a>
                  <CircleChevronRight size={19} />
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={`md:w-1/2 ${isReversed ? "md:order-1" : "md:order-2"}`}>
          {data.image && (
            <Image
              src={data.image}
              alt={data.name}
              width={600}
              height={400}
              className="object-cover rounded-lg shadow-md w-full h-auto"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutImage;
