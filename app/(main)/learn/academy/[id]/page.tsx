"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { API_URLS } from "@/app/api/url";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Image from "next/image";
import PictureBase from "@/components/explore/PictureBase";
import { GraduationCap } from "lucide-react";

interface Admin {
  id: number;
  name: string;
  description: string;
  monthOfJoin: string;
  avatar: string;
  position: string;
}

const AdminDetailPage: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmin = async () => {
      if (id) {
        try {
          const response = await axios.get(API_URLS.ADMINS);
          setAdmins(response.data);
          const foundAdmin = response.data.find(
            (admin: Admin) => admin.id.toString() === id
          );
          setAdmin(foundAdmin);
        } catch (error) {
          console.error("Error fetching admin:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchAdmin();
  }, [id]);

  const handleCardClick = (id: number) => {
    router.push(`/learn/academy/${id}`);
  };

  return (
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
          {admin?.name} &#128075;
        </h3>
      </div>

      {loading ? (
        <Skeleton className="h-80 w-full mb-4 rounded-xl animate-pulse" />
      ) : admin ? (
        <Card className="flex flex-col justify-between shadow-md bg-neutral-50 dark:bg-neutral-900 rounded-xl">
          <CardHeader className="text-center">
            <div className="flex justify-between">
              <div className="flex">
                <GraduationCap />
                <span className="p-1 text-sm"> Academy</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative h-80 w-full">
              <Image
                src={admin.avatar}
                alt={admin.name}
                fill
                className="object-cover w-full rounded-xl pb-4"
              />
            </div>
            <p>{admin.description}</p>
          </CardContent>
        </Card>
      ) : (
        <div className="p-4 text-center text-red-500">Admin not found</div>
      )}

      <div className="overflow-hidden">
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-bold my-auto">What&apos;s New</h2>
          <p
            className="text-green-400 items-center my-auto font-semibold text-sm cursor-pointer"
            onClick={() => router.push("/learn/academy")}
          >
            View All
          </p>
        </div>
        <ScrollArea className="rounded-md overflow-hidden">
          <div className="flex space-x-4 p-4">
            {loading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton key={index} className="w-96 h-48 rounded-lg" />
                ))
              : admins
                  .filter((a) => a.id !== admin?.id)
                  .map((admin) => (
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
    </div>
  );
};

export default AdminDetailPage;
