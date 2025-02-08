"use client";

import { AppSidebar } from "@/components/app-sidbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { BookOpenText, HomeIcon, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { API_URLS } from "../api/url";
import axios from "axios";
import { Input } from "@/components/ui/input";
import Link from "next/link";

interface SidebarItem {
  title: string;
  url: string;
  icon: React.ComponentType;
}

interface SidebarGroup {
  label: string;
  items: SidebarItem[];
}

interface HelpCenterItem {
  id: number;
  title: string;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [groups, setGroups] = useState<SidebarGroup[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<HelpCenterItem[]>(API_URLS.QUESTIONS);
        const helpCenterData = response.data;

        const sidebarItems: SidebarItem[] = helpCenterData.map((item) => ({
          title: item.title,
          url: `/questions/${item.id}`,
          icon: BookOpenText,
        }));

        setGroups([
          {
            label: "Explore",
            items: [{ title: "Explore", url: "/explore", icon: HomeIcon }],
          },
          { label: "Help Center", items: sidebarItems },
        ]);
      } catch (error) {
        console.error("Error fetching help center data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div
        className="bg-cover bg-center h-[220px] flex flex-col justify-center items-center text-white"
        style={{
          backgroundImage:
            "url('https://tribe-s3-production.imgix.net/pNjC7h1dgJgePWHQA7krF?w=2000&auto=compress')",
        }}
      >
        <h1 className="text-center sm:text-4xl text-xl font-bold">
          How can we help you?
        </h1>
        <div className="relative mt-4 w-[60%]">
          <Input
            type="text"
            placeholder="Search for answers"
            className="pr-12 bg-gray-950 bg-opacity-40"
          />
          <Search className="absolute top-1.5 right-3 text-gray-400" />
        </div>
      </div>

      <div className="flex max-w-4xl md:max-w-max m-auto">
        {/* md> */}
        <div className="hidden md:block">
          <div className="max-w-full min-w-64 relative mt-12">
            <div className="p-4">
              {groups.map((group, index) => (
                <div key={index} className="mb-6">
                  <h3 className="text-xs text-gray-400">{group.label}</h3>
                  <ul className="mt-2 space-y-2">
                    {group.items.map((item, idx) => (
                      <li key={idx}>
                        <Link
                          href={item.url}
                          className="flex items-center space-x-2 w-full rounded-md p-1 hover:bg-neutral-800"
                        >
                          <div className="text-sm">
                            <item.icon />
                          </div>
                          <span className="text-sm">{item.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* md< */}
        <SidebarProvider>
          <div className="flex-1">
            <div className="md:hidden">
              <AppSidebar groups={groups} />

              {/* <div className="flex justify-between items-center py-2 px-4">
                <div className="flex">
                  <SidebarTrigger />
                  <Breadcrumbs />
                </div>
                <div>
                  <ThemeToggle />
                </div>
              </div> */}
            </div>
            {children}
          </div>
        </SidebarProvider>
      </div>
    </>
  );
}
