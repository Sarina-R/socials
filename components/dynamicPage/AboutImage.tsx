// components/dynamicPage/AboutImage.tsx
"use client";

import Image from "next/image";
import { AboutSection } from "@/app/(dynamicPage)/home3/type";

interface AboutImageProps {
  data: AboutSection;
  primaryColor?: string;
}

const AboutImage = ({ data, primaryColor = "#c1102d" }: AboutImageProps) => {
  const isReversed = data.reverse || false;

  return (
    <section className="py-12 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Text Content */}
        <div className={`md:w-1/2 ${isReversed ? "md:order-2" : "md:order-1"}`}>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            {data.name}
          </h2>
          <h3
            className="text-3xl font-bold mb-4"
            style={{ color: primaryColor }}
          >
            {data.title}
          </h3>
          {data.description && (
            <p
              className="text-gray-600 dark:text-gray-400 mb-4"
              dangerouslySetInnerHTML={{ __html: data.description }}
            />
          )}
          {data.links && (
            <ul className="space-y-2">
              {data.links.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.link}
                    className="text-blue-600 hover:underline dark:text-blue-400"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Image */}
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
