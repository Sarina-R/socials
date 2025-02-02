"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

type Admins = {
  id: number;
  name: string;
  description: string;
  monthOfJoin: string;
  avatar: string;
  position: string;
};

const ConnectSocialsPage: React.FC = () => {
  const [admins, setAdmins] = useState<Admins[]>([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get("/api/admins");
        setAdmins(response.data);
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };
    fetchAdmins();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">What's New</h2>
      <ScrollArea className="rounded-md overflow-x-auto">
        <div className="flex space-x-4 p-4 w-max">
          {admins.map((admin) => (
            <Card
              key={admin.id}
              className="w-[350px] h-[250px] flex flex-col justify-between p-4 shadow-md bg-gray-100 dark:bg-gray-900 rounded-xl"
            >
              <CardContent className="flex flex-col gap-3 flex-grow">
                <div className="flex items-center gap-3">
                  <img
                    src={admin.avatar}
                    alt={admin.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-md font-semibold">{admin.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {admin.monthOfJoin}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm break-words leading-relaxed">
                  {admin.description}
                </p>
              </CardContent>
              <div className="p-2 border-t text-green-600 dark:text-green-400 font-bold text-sm text-center">
                {admin.position}
              </div>
            </Card>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default ConnectSocialsPage;
