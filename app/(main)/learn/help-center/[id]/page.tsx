"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { API_URLS } from "@/app/api/url";
import { Skeleton } from "@/components/ui/skeleton";
type HelpCenterItem = {
  id: number;
  title: string;
  des: string;
  labels?: string[];
};

type HelpCategory = {
  des: HelpCenterItem[];
};

export default function HelpCenterDetail() {
  const router = useRouter();
  const { id } = useParams();
  const [helpItem, setHelpItem] = useState<HelpCenterItem | null>(null);

  useEffect(() => {
    if (!id) return;

    axios
      .get(API_URLS.QUESTIONS)
      .then((response) => {
        const allItems = response.data.flatMap(
          (category: HelpCategory) => category.des
        );
        const item = allItems.find(
          (item: HelpCenterItem) => item.id === parseInt(id as string)
        );
        setHelpItem(item);
      })
      .catch((error) => {
        console.error("Error fetching help center data:", error);
      });
  }, [id]);

  if (!helpItem) {
    return (
      <>
        <Skeleton className="h-10 w-3/4 mb-2 mt-8" />
        <Skeleton className="h-60 w-full" />
      </>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{helpItem.title}</h1>

      <p className="mb-6">{helpItem.des}</p>

      {helpItem.labels && (
        <div className="flex flex-wrap gap-2 mb-6">
          {helpItem.labels.map((label, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-full text-sm bg-neutral-100 dark:bg-neutral-900"
            >
              {label}
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-4">
        <Button variant="default" onClick={() => alert("Feedback submitted!")}>
          Send Feedback
        </Button>
        <Button variant="secondary" onClick={() => router.push("/questions/1")}>
          Go Back
        </Button>
      </div>
    </div>
  );
}
