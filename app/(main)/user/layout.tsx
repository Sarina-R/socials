"use client";

import { API_URLS } from "@/app/api/url";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AttendedEvent } from "./[id]/type";
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
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [attendedEvents, setAttendedEvents] = useState<AttendedEvent[]>([]);

  useEffect(() => {
    const fetchParticipate = async () => {
      try {
        const response = await axios.get(API_URLS.PARTICIPATE);
        setAttendedEvents(response.data.attended_events);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoadingEvents(false);
      }
    };

    fetchParticipate();
  }, []);

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
    <div className="xl:flex gap-4 p-6">
      {children}

      <div className="mx-auto flex justify-center">
        <div className="rounded-xl w-full xl:w-80 max-h-max max-w-3xl mx-auto">
          <Card className="shadow-lg xl:m-auto mb-6">
            <CardHeader>
              <h3 className="text-xl font-semibold">Participate</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              {loadingEvents ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                ))
              ) : attendedEvents.length > 0 ? (
                attendedEvents.map((event) => (
                  <div key={event.event_id} className="flex flex-col gap-1">
                    <h4 className="text-lg font-medium">{event.event_name}</h4>
                    <p className="text-sm text-neutral-500">
                      {event.event_date} - {event.location}
                    </p>
                    <p className="text-sm text-neutral-700 dark:text-neutral-400">
                      {event.description}
                    </p>
                    <span className="text-xs font-semibold">
                      {event.participation_type} -{" "}
                      {event.team_name || event.session_topic}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-neutral-500">
                  No participation records found.
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="p-4 my-4">
            <h3 className="text-lg font-semibold mb-4">
              More profiles for you
            </h3>
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
                  <div
                    key={item.id}
                    className="flex items-center space-x-3 py-3"
                  >
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
    </div>
  );
}
