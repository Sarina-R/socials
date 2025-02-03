"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import TwitterBase from "@/components/explore/TwitterBase";
import PictureBase from "@/components/explore/PictureBase";
import { API_URLS } from "../api/url";

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
  const router = useRouter();

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get(API_URLS.ADMINS);
        setAdmins(response.data);
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };
    fetchAdmins();
  }, []);

  const handleCardClick = (id: number) => {
    router.push(`/connect-socials/${id}`);
  };

  return (
    <>
      <div className="p-4 overflow-hidden">
        <h2 className="text-2xl font-bold mb-6">What&apos;s New</h2>
        <ScrollArea className="flex">
          <div className="flex space-x-4 p-4">
            {admins.map((admin) => (
              <TwitterBase
                key={admin.id}
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

      <div className="p-[1rem] overflow-hidden">
        <h2 className="text-2xl font-bold mb-6">What&apos;s New</h2>
        <ScrollArea className="rounded-md overflow-hidden">
          <div className="flex space-x-4 p-4">
            {admins.map((admin) => (
              <PictureBase
                key={admin.id}
                title={admin.name}
                des={admin.description}
                imgSrc={admin.avatar}
                imgAlt={admin.name}
                onClick={() => handleCardClick(admin.id)}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
};

export default ConnectSocialsPage;
