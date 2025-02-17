"use client";

import { API_URLS } from "@/app/api/url";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import Link from "next/link";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URLS.ADMINS);
        setSidebarItems(response.data);
      } catch (error) {
        console.error("Error fetching sidebar data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="lg:flex gap-4">
      {children}

      <div className="mx-auto flex justify-center">
        <Card className="rounded-xl w-full lg:w-80 max-h-max max-w-3xl mx-auto lg:mx-0 md:mx-6 my-6 p-4 shadow-md">
          <h3 className="text-lg font-semibold mb-4">More profiles for you</h3>

          {loading
            ? Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex items-center space-x-3 py-3">
                  <Skeleton className="w-12 h-12 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                  <Skeleton className="h-8 w-20 rounded-md" />
                </div>
              ))
            : sidebarItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-3 py-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={item.avatar} alt={item.name} />
                    <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-gray-600 truncate">
                      {item.position}
                    </p>
                  </div>

                  <Link href={`/user/${item.id}`}>
                    <Button
                      size="sm"
                      className="font-bold w-20 bg-black dark:bg-white"
                    >
                      View profile
                    </Button>
                  </Link>
                </div>
              ))}
        </Card>
      </div>
    </div>
  );
}
