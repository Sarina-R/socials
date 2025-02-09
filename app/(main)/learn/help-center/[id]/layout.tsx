"use client";

import { useEffect, useState } from "react";
import { BookOpenText } from "lucide-react";
import axios from "axios";
import Link from "next/link";
import { API_URLS } from "@/app/api/url";

interface SidebarItem {
  title: string;
  url: string;
  icon: React.ElementType;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarItems, setSidebarItems] = useState<SidebarItem[]>([]);

  useEffect(() => {
    axios
      .get<{ id: number; title: string }[]>(API_URLS.QUESTIONS)
      .then((response) => {
        const formattedItems: SidebarItem[] = response.data.map((item) => ({
          title: item.title,
          url: `/questions/${item.id}`,
          icon: BookOpenText,
        }));
        setSidebarItems(formattedItems);
      })
      .catch((error) => console.error("Error fetching sidebar data:", error));
  }, []);

  return (
    <div className="sm:flex">
      <div className="flex-1">{children}</div>

      <div className="w-64 p-4">
        <ul className="space-y-2">
          {sidebarItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <li key={idx}>
                <Link
                  href={item.url}
                  className="flex items-center space-x-2 w-full rounded-md p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  <div className="text-sm">
                    <Icon size={18} />
                  </div>
                  <span className="text-sm">{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
