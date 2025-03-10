"use client";

import Copyright from "@/components/dynamicPage/Copyright";
import Footer from "@/components/dynamicPage/Footer";
import { useData } from "@/hooks/DataProvider";
import {
  ApiResponse,
  CategoriesSection,
  FooterSection,
  NavItem,
} from "../type";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = useData() as ApiResponse;
  const [footerData, setFooterData] = useState<FooterSection | null>(null);
  const [categoriesSection, setCategoriesSection] =
    useState<CategoriesSection | null>(null);
  const pathname = usePathname();
  const [header, setHeader] = useState<NavItem>();

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

    const findActiveTitle = (): NavItem => {
      if (!data.menu.navItems)
        return { name: "Home", path: "/home3", MarkDownItem: "" };

      for (const item of data.menu.navItems) {
        if (item.path === pathname) {
          return item;
        }

        if (item.dropdown) {
          const dropdownMatch = item.dropdown.find(
            (dropdownItem) => dropdownItem.path === pathname
          );
          if (dropdownMatch) {
            return dropdownMatch;
          }
        }
      }
      return { name: "Home", path: "/home3", MarkDownItem: "" };
    };

    setHeader(findActiveTitle());
  }, [data, pathname]);

  if (!data) return null;
  const primaryColor = data.brand.primaryColor;

  return (
    <>
      <div
        className="w-full py-20 text-center space-y-1"
        style={{ backgroundColor: primaryColor }}
      >
        <h2 className="text-white font-bold text-xl">{header?.name}</h2>
        <div className="text-xs text-white/60 flex justify-center gap-2">
          <Link href="/home3" className="hover:text-white/90 transition-all">
            Home
          </Link>
          <p>{">"}</p>
          <Link
            href={header?.path || "#"}
            className="hover:text-white/90 transition-all"
          >
            {header?.name}
          </Link>
        </div>
      </div>
      <div className="min-h-[50vh] md:p-12 p-4 space-y-12">{children}</div>
      {footerData && (
        <Footer
          data={footerData as FooterSection}
          primaryColor={primaryColor || "#0ebaba"}
          logo={data.brand.logo}
          categories={categoriesSection}
        />
      )}
      <Copyright
        primaryColor={primaryColor || "#0ebaba"}
        text={data.brand.copyright}
      />
    </>
  );
}
