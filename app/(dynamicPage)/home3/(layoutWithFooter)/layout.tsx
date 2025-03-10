"use client";

import Copyright from "@/components/dynamicPage/Copyright";
import Footer from "@/components/dynamicPage/Footer";
import { useData } from "@/hooks/DataProvider";
import { ApiResponse, CategoriesSection, FooterSection } from "../type";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = useData() as ApiResponse;
  const [footerData, setFooterData] = useState<FooterSection | null>(null);
  const [categoriesSection, setCategoriesSection] =
    useState<CategoriesSection | null>(null);

  useEffect(() => {
    if (!data) return;

    const categories = data.sections.find(
      (section) => section.type === "categories"
    ) as CategoriesSection | undefined;
    setCategoriesSection(categories || null);

    const footer = data.sections.find(
      (section) => section.type === "footer"
    ) as FooterSection | undefined;
    setFooterData(footer || null);
  }, [data]);

  if (!data) return null;
  const primaryColor = data.brand.primaryColor;

  return (
    <>
      <div className="min-h-[50vh]">{children}</div>
      {footerData && (
        <Footer
          data={footerData as FooterSection}
          primaryColor={primaryColor || "#c1102d"}
          logo={data.brand.logo}
          categories={categoriesSection}
        />
      )}
      <Copyright
        primaryColor={primaryColor || "#c1102d"}
        text={data.brand.copyright}
      />
    </>
  );
}
