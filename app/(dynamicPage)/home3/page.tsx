"use client";

import { useEffect, useState } from "react";
import { serialize } from "next-mdx-remote/serialize";
import HeroSection from "@/components/dynamicPage/HeroSection";
import {
  ApiResponse,
  HeroSection as HeroSectionType,
} from "@/app/(dynamicPage)/home3/type";

const Page = () => {
  const [serializedHeroSection, setSerializedHeroSection] =
    useState<HeroSectionType>();
  const [primaryColor, setPrimaryColor] = useState<string>();
  const [poster, setPoster] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiResponse: ApiResponse = await fetch(
          "http://localhost:3000/api/home"
        ).then((res) => res.json());

        const heroSection = apiResponse.sections.find(
          (section) => section.type === "hero"
        );

        if (heroSection) {
          const serializedTitle = await serialize(heroSection.title);
          const serializedDescription = await serialize(
            heroSection.description
          );
          const serialized = {
            ...heroSection,
            title: serializedTitle,
            description: serializedDescription,
          };
          setSerializedHeroSection(serialized);
          setPrimaryColor(apiResponse.brand.primaryColor);
          setPoster(apiResponse.brand.poster);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {serializedHeroSection && (
        <HeroSection
          data={serializedHeroSection}
          primaryColor={primaryColor || "#FF0000"}
          poster={poster || ""}
          btnName={serializedHeroSection.btnName}
          btnURL={serializedHeroSection.btnURL}
        />
      )}
    </>
  );
};

export default Page;
