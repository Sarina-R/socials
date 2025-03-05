"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { serialize } from "next-mdx-remote/serialize";
import HeroSection from "@/components/dynamicPage/HeroSection";
import {
  ApiResponse,
  HeroSection as HeroSectionType,
} from "@/app/(dynamicPage)/home3/type";
import { API_URLS } from "@/app/api/url";

const Page = () => {
  const [serializedHeroSection, setSerializedHeroSection] =
    useState<HeroSectionType>();
  const [primaryColor, setPrimaryColor] = useState<string>();
  const [poster, setPoster] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: apiResponse } = await axios.get<ApiResponse>(
          API_URLS.DYNAMIC_PAGE
        );

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
