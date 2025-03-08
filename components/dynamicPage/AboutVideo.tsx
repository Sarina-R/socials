// components/dynamicPage/AboutVideo.tsx
"use client";

import { AboutSection } from "@/app/(dynamicPage)/home3/type";

interface AboutVideoProps {
  data: AboutSection;
  primaryColor?: string;
}

const AboutVideo = ({ data, primaryColor = "#c1102d" }: AboutVideoProps) => {
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

        {/* Video */}
        <div className={`md:w-1/2 ${isReversed ? "md:order-1" : "md:order-2"}`}>
          {data.video && (
            <div className="w-full h-0 pb-[56.25%] relative rounded-lg shadow-md overflow-hidden">
              <iframe
                src={data.video}
                title={data.name}
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutVideo;
