"use client";

import { useEffect, useState } from "react";
import { serialize } from "next-mdx-remote/serialize";
import HeroSection from "@/components/dynamicPage/HeroSection";
import Challenge from "@/components/dynamicPage/Challenges";
import Parents from "@/components/dynamicPage/Parents";
import AboutImage from "@/components/dynamicPage/AboutImage";
import AboutVideo from "@/components/dynamicPage/AboutVideo";
import {
  HeroSection as HeroSectionType,
  CategoriesSection,
  ParentsSection,
  AboutSection,
  Section,
} from "@/app/(dynamicPage)/home3/type";
import { useData } from "@/hooks/DataProvider";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

const Page = () => {
  const data = useData();
  const [sections, setSections] = useState<
    (HeroSectionType | CategoriesSection | ParentsSection | AboutSection)[]
  >([]);

  useEffect(() => {
    const processData = async () => {
      if (!data) return;

      const processSection = async (section: Section): Promise<Section> => {
        if (section.type === "hero" || section.type === "about") {
          const [serializedTitle, serializedDescription] = await Promise.all([
            serialize(section.title as string),
            section.description
              ? serialize(section.description as string)
              : Promise.resolve(undefined),
          ]);
          return {
            ...section,
            title: serializedTitle,
            description:
              serializedDescription ?? ({} as MDXRemoteSerializeResult),
          };
        }
        return section;
      };

      try {
        const processedSections = await Promise.all(
          data.sections.map(processSection)
        );

        setSections(processedSections);
      } catch (error) {
        console.error("Error processing sections:", error);
      }
    };

    processData();
  }, [data]);

  if (!data || sections.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white font-futura">
        <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-28 pb-10">
      {sections.map((section, index) => {
        switch (section.type) {
          case "hero":
            return (
              <HeroSection
                key={index}
                data={section as HeroSectionType}
                primaryColor={data.brand.primaryColor || "#c1102d"}
                poster={data.brand.poster || ""}
                btnName={(section as HeroSectionType).btnName}
                btnURL={(section as HeroSectionType).btnURL}
              />
            );
          case "categories":
            return (
              <Challenge
                key={index}
                data={section as CategoriesSection}
                primaryColor={data.brand.primaryColor || "#c1102d"}
                name={data.brand.name}
              />
            );
          case "parents":
            return (
              <Parents
                key={index}
                data={section as ParentsSection}
                primaryColor={data.brand.primaryColor || "#c1102d"}
              />
            );
          case "about":
            const aboutSection = section as AboutSection;
            return aboutSection.image ? (
              <AboutImage
                key={index}
                data={aboutSection}
                primaryColor={data.brand.primaryColor || "#c1102d"}
              />
            ) : aboutSection.video ? (
              <AboutVideo
                key={index}
                data={aboutSection}
                primaryColor={data.brand.primaryColor || "#c1102d"}
              />
            ) : null;
          default:
            return null;
        }
      })}
    </div>
  );
};

export default Page;
