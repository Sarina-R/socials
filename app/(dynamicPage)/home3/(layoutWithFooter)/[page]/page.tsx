"use client";

import { useData } from "@/hooks/DataProvider";
import { ApiResponse, NavItem } from "../../type";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize"; // Import serialize
import { useMDXComponents } from "@/mdx-component";

const Page = () => {
  const data = useData() as ApiResponse;
  const pathname = usePathname();
  const [mdxSource, setMdxSource] = useState<any>(null);

  const mdxComponents = useMDXComponents({});

  useEffect(() => {
    const findActiveLink = async () => {
      if (!data.menu.navItems) {
        return { name: "Home", path: "/home3" };
      }

      for (const item of data.menu.navItems) {
        if (item.path === pathname) {
          if (item.MarkDownItem) {
            const mdxContent = await serialize(item.MarkDownItem);
            setMdxSource(mdxContent);
          }
          return item;
        }

        if (item.dropdown) {
          const dropdownMatch = item.dropdown.find(
            (dropdownItem) => dropdownItem.path === pathname
          );
          if (dropdownMatch && dropdownMatch.MarkDownItem) {
            const mdxContent = await serialize(dropdownMatch.MarkDownItem);
            setMdxSource(mdxContent);
          }
          return dropdownMatch || { name: "Home", path: "/home3" };
        }
      }
      return { name: "Home", path: "/home3" };
    };

    findActiveLink();
  }, [pathname, data.menu.navItems]);

  return (
    <div className="container mx-auto p-4 text-neutral-700">
      {mdxSource ? (
        <MDXRemote
          {...mdxSource}
          components={mdxComponents}
          primaryColor="blue"
        />
      ) : (
        <p>No Markdown content available for this page.</p>
      )}
    </div>
  );
};

export default Page;
