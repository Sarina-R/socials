"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import TwitterBase from "@/components/explore/TwitterBase";

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
      <h2 className="text-2xl font-bold mb-6">What&apos;s New</h2>
      <ScrollArea className="rounded-md overflow-x-auto">
        <div className="flex space-x-4 p-4 w-max">
          {admins.map((admin) => (
            <TwitterBase
              key={admin.id}
              id={admin.id}
              name={admin.name}
              avatar={admin.avatar}
              time={admin.monthOfJoin}
              des={admin.description}
              footer={admin.position}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default ConnectSocialsPage;
