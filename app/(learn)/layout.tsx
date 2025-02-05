"use client";

import { AppSidebar } from "@/components/app-sidbar";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ThemeToggle } from "@/components/ThemToggle";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { BookOpenText, HomeIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { API_URLS } from "../api/url";
import axios from "axios";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [groups, setGroups] = useState<{ label: string; items: any[] }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URLS.HELP_CARD);
        const helpCenterData = response.data;

        const sidebarItems = helpCenterData.map((item: { title: string }) => ({
          title: item.title,
          url: `/questions/${item.title.replace(/\s+/g, "-").toLowerCase()}`,
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
      <div className="flex-1 p-4 w-[calc(100vw-17rem)]">
        <div className="flex justify-between items-center p-4">
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
