"use client";

import { API_URLS } from "@/app/api/url";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import Image from "next/image";
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
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-4">
            {loading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton key={index} className="w-full h-48 rounded-lg" />
                ))
              : admins.map((admin) => (
                  <Card
                    className="w-full h-full flex flex-col justify-between shadow-md bg-neutral-50 dark:bg-neutral-900 rounded-xl hover:cursor-pointer"
                    onClick={() => handleCardClick(admin.id)}
                  >
                    <div className="relative h-52 w-full">
                      <Image
                        src={admin.avatar}
                        alt={admin.name}
                        fill
                        className="object-cover rounded-t-xl"
                      />
                    </div>
                    <div className="p-4">
                      <h2 className="text-xl font-bold">{admin.name}</h2>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                        {admin.description.length > 100
                          ? `${admin.description.slice(0, 60)}...`
                          : admin.description}
                      </p>
                    </div>
                  </Card>
                ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AcademyPage;
