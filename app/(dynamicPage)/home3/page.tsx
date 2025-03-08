"use client";

import { useEffect, useState } from "react";
import { serialize } from "next-mdx-remote/serialize";
import HeroSection from "@/components/dynamicPage/HeroSection";
import {
  HeroSection as HeroSectionType,
  CategoriesSection,
} from "@/app/(dynamicPage)/home3/type";
import { useData } from "@/hooks/DataProvider";
import Challenge from "@/components/dynamicPage/Challenges";

const Page = () => {
  const data = useData();
  const [serializedHeroSection, setSerializedHeroSection] =
    useState<HeroSectionType>();
  const [categoriesSection, setCategoriesSection] =
    useState<CategoriesSection>();

  useEffect(() => {
    const processData = async () => {
      if (!data) return;

      const heroSection = data.sections.find(
        (section) => section.type === "hero"
      ) as HeroSectionType;
      const categories = data.sections.find(
        (section) => section.type === "categories"
      ) as CategoriesSection;

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

      if (categories) {
        setCategoriesSection(categories);
      }
    };

    processData();
  }, [data]);

  if (!data || !serializedHeroSection) return null;

  return (
    <div className="space-y-10 pb-10">
      <HeroSection
        data={serializedHeroSection}
        primaryColor={data.brand.primaryColor || "#7338A0"}
        poster={data.brand.poster || ""}
        btnName={serializedHeroSection.btnName}
        btnURL={serializedHeroSection.btnURL}
      />

      {categoriesSection && (
        <Challenge
          data={categoriesSection}
          primaryColor={data.brand.primaryColor || "#7338A0"}
          name={data.brand.name}
        />
      )}
    </div>
  );
};

export default Page;
