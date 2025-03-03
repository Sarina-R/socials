"use client";

import HeroSection from "@/components/dynamicPage/HeroSection";
import { useData } from "@/hooks/DataProvider";

const Page = () => {
  const data = useData();
  const heroSection = data.sections.find((section) => section.type === "hero");

  return (
    <>
      <HeroSection data={heroSection!} primaryColor={data.brand.primaryColor} />
    </>
  );
};

export default Page;
