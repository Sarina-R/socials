import { serialize } from "next-mdx-remote/serialize";
import HeroSection from "@/components/dynamicPage/HeroSection";
import {
  ApiResponse,
  HeroSection as HeroSectionType,
} from "@/app/(dynamicPage)/home3/type";

const Page = async () => {
  const apiResponse: ApiResponse = await fetch(
    "http://localhost:3000/api/home"
  ).then((res) => res.json());

  const heroSection = apiResponse.sections.find(
    (section) => section.type === "hero"
  );

  let serializedHeroSection: HeroSectionType | undefined;

  if (heroSection) {
    const serializedTitle = await serialize(heroSection.title);
    const serializedDescription = await serialize(heroSection.description);
    serializedHeroSection = {
      ...heroSection,
      title: serializedTitle,
      description: serializedDescription,
    };
  }

  return (
    <>
      {serializedHeroSection && (
        <HeroSection
          data={serializedHeroSection}
          primaryColor={apiResponse.brand.primaryColor}
          poster={apiResponse.brand.poster}
          btnName={serializedHeroSection.btnName}
          btnURL={serializedHeroSection.btnURL}
        />
      )}
    </>
  );
};

export default Page;
