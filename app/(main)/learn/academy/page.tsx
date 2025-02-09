"use client";

import { API_URLS } from "@/app/api/url";
import PictureBase from "@/components/explore/PictureBase";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Admin {
  id: number;
  name: string;
  description: string;
  monthOfJoin: string;
  avatar: string;
  position: string;
}

const AcademyPage = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await axios.get(API_URLS.ADMINS);
        setAdmins(response.data);
      } catch (error) {
        console.error("Error fetching admin:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAdmin();
  }, []);

  const handleCardClick = (id: number) => {
    router.push(`/learn/academy/${id}`);
  };

  return (
    <>
      <div className="p-4 space-y-8">
        <div className="relative w-full h-32 overflow-hidden rounded-lg">
          <video
            src="https://files-us-east-1.t-cdn.net/files/1GG2rmxcOLAUjnt5zTqoY"
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
          />
          <h3 className="absolute bottom-2 left-2 text-white text-lg font-bold bg-black bg-opacity-80 px-2 py-1 rounded">
            Videos & Tutorials
          </h3>
        </div>

        <div className="overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {loading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton key={index} className="w-full h-48 rounded-lg" />
                ))
              : admins.map((admin) => (
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
        </div>
      </div>
    </>
  );
};

export default AcademyPage;
