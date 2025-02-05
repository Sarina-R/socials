"use client";

import { AppSidebar } from "@/components/app-sidbar";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ThemeToggle } from "@/components/ThemToggle";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { BookOpenText, HomeIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { API_URLS } from "../api/url";
import axios from "axios";

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
    <SidebarProvider>
      <AppSidebar groups={groups} />
      <div className="flex-1 mx-[-17px] w-[calc(100vw-17rem)]">
        <div className="flex justify-between items-center py-2">
          <div className="flex">
            <SidebarTrigger />
            <Breadcrumbs />
          </div>
          <div>
            <ThemeToggle />
          </div>
        </div>
        {children}
      </div>
    </SidebarProvider>
  );
}
