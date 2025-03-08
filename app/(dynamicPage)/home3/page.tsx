"use client";
import { useEffect, useState } from "react";
import { serialize } from "next-mdx-remote/serialize";
import HeroSection from "@/components/dynamicPage/HeroSection";
import Parents from "@/components/dynamicPage/Parents";
import AboutImage from "@/components/dynamicPage/AboutImage";
import AboutVideo from "@/components/dynamicPage/AboutVideo";
import {
  HeroSection as HeroSectionType,
  CategoriesSection,
  ParentsSection,
  AboutSection,
} from "@/app/(dynamicPage)/home3/type";
import { useData } from "@/hooks/DataProvider";
import Challenge from "@/components/dynamicPage/Challenges";

const Page = () => {
  const data = useData();
  const [serializedHeroSection, setSerializedHeroSection] =
    useState<HeroSectionType>();
  const [categoriesSection, setCategoriesSection] =
    useState<CategoriesSection>();
  const [parentsSection, setParentsSection] = useState<ParentsSection>();
  const [aboutSections, setAboutSections] = useState<AboutSection[]>([]);

  useEffect(() => {
    const processData = async () => {
      if (!data) return;

      const heroSection = data.sections.find(
        (section) => section.type === "hero"
      ) as HeroSectionType;
      const categories = data.sections.find(
        (section) => section.type === "categories"
      ) as CategoriesSection;
      const parents = data.sections.find(
        (section) => section.type === "parents"
      ) as ParentsSection;
      const abouts = data.sections.filter(
        (section) => section.type === "about"
      ) as AboutSection[];

      if (heroSection) {
        const serializedTitle = await serialize(heroSection.title as string);
        const serializedDescription = await serialize(
          heroSection.description as string
        );
        setSerializedHeroSection({
          ...heroSection,
          title: serializedTitle,
          description: serializedDescription,
        });
      }

      if (categories) setCategoriesSection(categories);
      if (parents) setParentsSection(parents);
      if (abouts.length > 0) setAboutSections(abouts);
    };

    processData();
  }, [data]);

  if (!data || !serializedHeroSection) return null;

  return (
    <div className="space-y-16 pb-10">
      <HeroSection
        data={serializedHeroSection}
        primaryColor={data.brand.primaryColor || "#FF0000"}
        poster={data.brand.poster || ""}
        btnName={serializedHeroSection.btnName}
        btnURL={serializedHeroSection.btnURL}
      />
      {categoriesSection && (
        <Challenge
          data={categoriesSection}
          primaryColor={data.brand.primaryColor || "#FF0000"}
          name={data.brand.name}
        />
      )}
      {parentsSection && (
        <Parents
          data={parentsSection}
          primaryColor={data.brand.primaryColor || "#c1102d"}
        />
      )}
      {aboutSections.map((section, index) =>
        section.image ? (
          <AboutImage
            key={index}
            data={section}
            primaryColor={data.brand.primaryColor || "#c1102d"}
          />
        ) : section.video ? (
          <AboutVideo
            key={index}
            data={section}
            primaryColor={data.brand.primaryColor || "#c1102d"}
          />
        ) : null
      )}
    </div>
  );
};

export default Page;
