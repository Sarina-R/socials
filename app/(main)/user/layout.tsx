"use client";

import { API_URLS } from "@/app/api/url";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import axios from "axios";

interface SidebarItem {
  id: number;
  name: string;
  description: string;
  monthOfJoin: string;
  avatar: string;
  position: string;
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [sidebarItems, setSidebarItems] = useState<SidebarItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URLS.ADMINS);
        setSidebarItems(response.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="lg:flex gap-1">
      {children}

      <Card className="rounded-xl p-4 lg:w-80 w-full max-h-max mt-6 lg:mx-0 md:mx-6 mx-1 shadow-md">
        <h3 className="text-lg font-semibold mb-4">More profiles for you</h3>
        {sidebarItems.map((item) => (
          <div key={item.id} className="flex items-center space-x-3 py-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={item.avatar} alt={item.name} />
              <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h4 className="font-medium">{item.name} </h4>
              <p className="text-sm text-gray-600 truncate">{item.position}</p>
            </div>
            <Button
              size="sm"
              className="font-bold mt-1 w-20 bg-black dark:bg-white"
            >
              View profile
            </Button>
          </div>
        ))}
      </Card>
    </div>
  );
}
