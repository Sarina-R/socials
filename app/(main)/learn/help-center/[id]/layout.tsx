"use client";

import { useEffect, useState } from "react";
import { BookOpenText } from "lucide-react";
import axios from "axios";
import Link from "next/link";
import { API_URLS } from "@/app/api/url";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarItems, setSidebarItems] = useState<
    { title: string; url: string; icon: any }[]
  >([]);

  useEffect(() => {
    axios
      .get(API_URLS.QUESTIONS)
      .then((response) => {
        const formattedItems = response.data.map((item: any) => ({
          title: item.title,
          url: `/questions/${item.id}`,
          icon: BookOpenText,
        }));
        setSidebarItems(formattedItems);
      })
      .catch((error) => console.error("Error fetching sidebar data:", error));
  }, []);

  return (
    <div className="flex">
      <div className="flex-1">{children}</div>

      <div className="sm:block hidden w-64 text-white p-4">
        <ul className="space-y-2">
          {sidebarItems.map((item, idx) => (
            <li key={idx}>
              <Link
                href={item.url}
                className="flex items-center space-x-2 w-full rounded-md p-2 hover:bg-neutral-800"
              >
                <div className="text-sm">
                  <item.icon size={18} />
                </div>
                <span className="text-sm">{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
