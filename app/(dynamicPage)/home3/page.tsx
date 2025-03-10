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
  ImportantDatesSection,
  FooterSection,
} from "@/app/(dynamicPage)/home3/type";
import { useData } from "@/hooks/DataProvider";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import ImportantDates from "@/components/dynamicPage/ImportantDates";
import Footer from "@/components/dynamicPage/Footer";
import Copyright from "@/components/dynamicPage/Copyright";

const Page = () => {
  const data = useData();
  const [sections, setSections] = useState<Section[]>([]);
  const [categoriesSection, setCategoriesSection] =
    useState<CategoriesSection | null>(null);

  useEffect(() => {
    const processData = async () => {
      if (!data) return;

      const processSection = async (section: Section): Promise<Section> => {
        if (
          section.type === "hero" ||
          section.type === "about" ||
          section.type === "importantDates"
        ) {
          const [serializedTitle, serializedDescription] = await Promise.all([
            serialize(section.title as string),
            section.description
              ? serialize(section.description as string)
              : Promise.resolve({} as MDXRemoteSerializeResult),
          ]);

          if (section.type === "importantDates") {
            const serializedItems = await Promise.all(
              section.items.map(async (item) => ({
                ...item,
                title: await serialize(item.title as string),
                description: item.description
                  ? await serialize(item.description as string)
                  : ({} as MDXRemoteSerializeResult),
              }))
            );

            return {
              ...section,
              title: serializedTitle,
              description: serializedDescription,
              items: serializedItems,
            };
          }

          return {
            ...section,
            title: serializedTitle,
            description: serializedDescription,
          };
        }
        return section;
      };

      try {
        const processedSections = await Promise.all(
          data.sections.map(processSection)
        );

        const categories = processedSections.find(
          (section): section is CategoriesSection =>
            section.type === "categories"
        );
        setCategoriesSection(categories || null);

        setSections(processedSections);
      } catch (error) {
        console.error("Error processing sections:", error);
      }
    };

    processData();
  }, [data]);

  if (!data || sections.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center font-futura">
        <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="space-y-28">
        {sections.map((section, index) => {
          switch (section.type) {
            case "hero":
              return (
                <HeroSection
                  key={index}
                  data={section as HeroSectionType}
                  primaryColor={data.brand.primaryColor || "#0ebaba"}
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
                  primaryColor={data.brand.primaryColor || "#0ebaba"}
                  name={data.brand.name}
                />
              );
            case "parents":
              return (
                <Parents
                  key={index}
                  data={section as ParentsSection}
                  primaryColor={data.brand.primaryColor || "#0ebaba"}
                />
              );
            case "about":
              const aboutSection = section as AboutSection;
              return aboutSection.image ? (
                <AboutImage
                  key={index}
                  data={aboutSection}
                  primaryColor={data.brand.primaryColor || "#0ebaba"}
                />
              ) : aboutSection.video ? (
                <AboutVideo
                  key={index}
                  data={aboutSection}
                  primaryColor={data.brand.primaryColor || "#0ebaba"}
                />
              ) : null;
            case "importantDates":
              return (
                <ImportantDates
                  key={index}
                  data={section as ImportantDatesSection}
                  primaryColor={data.brand.primaryColor || "#0ebaba"}
                />
              );
            case "footer":
              return (
                <Footer
                  key={index}
                  data={section as FooterSection}
                  primaryColor={data.brand.primaryColor || "#0ebaba"}
                  logo={data.brand.logo}
                  categories={categoriesSection}
                />
              );
            default:
              return null;
          }
        })}
      </div>
      <Copyright
        primaryColor={data.brand.primaryColor || "#0ebaba"}
        text={data.brand.copyright}
      />
    </>
  );
};

export default Page;
