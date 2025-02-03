"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { API_URLS } from "@/app/api/url";

type Admin = {
  id: number;
  name: string;
  description: string;
  monthOfJoin: string;
  avatar: string;
  position: string;
};

const AdminDetailPage: React.FC = () => {
  const { id } = useParams();
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmin = async () => {
      if (id) {
        try {
          const response = await axios.get(API_URLS.ADMINS);
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!admin) {
    return <div>Admin not found</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">{admin.name}</h1>
      <img
        src={admin.avatar}
        alt={admin.name}
        className="rounded-full w-32 h-32"
      />
      <p className="mt-4">{admin.description}</p>
      <p className="mt-2">Position: {admin.position}</p>
      <p className="mt-2">Joined: {admin.monthOfJoin}</p>
    </div>
  );
};

export default AdminDetailPage;
