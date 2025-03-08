"use client";

import { useEffect, useState } from "react";
import { serialize } from "next-mdx-remote/serialize";
import HeroSection from "@/components/dynamicPage/HeroSection";
import { HeroSection as HeroSectionType } from "@/app/(dynamicPage)/home3/type";
import { useData } from "@/hooks/DataProvider";

const Page = () => {
  const data = useData();
  const [serializedHeroSection, setSerializedHeroSection] =
    useState<HeroSectionType>();

  useEffect(() => {
    const serializeHeroSection = async () => {
      if (!data) return;

      const heroSection = data.sections.find(
        (section) => section.type === "hero"
      ) as HeroSectionType;

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
    };

    serializeHeroSection();
  }, [data]);

  if (!data || !serializedHeroSection) return null;

  return (
    <HeroSection
      data={serializedHeroSection}
      primaryColor={data.brand.primaryColor || "#FF0000"}
      poster={data.brand.poster || ""}
      btnName={serializedHeroSection.btnName}
      btnURL={serializedHeroSection.btnURL}
    />
  );
};

export default Page;
