"use client";

import axios from "axios";
import { API_URLS } from "@/app/api/url";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Qualification = () => {
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URLS.QUALIFICATION);
        setText(response.data.text);
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mx-auto sm:p-4 p-0">
      <h1 className="text-3xl font-bold mb-4">Qualification</h1>
      <p className="text-lg font-semibold mb-2">
        Submission and qualification material.
      </p>
      {loading ? (
        <>
          <Skeleton className="h-4 w-full mt-2" />
          <Skeleton className="h-4 w-5/6 mt-2" />
          <Skeleton className="h-4 w-full mt-2" />
          <Skeleton className="h-4 w-5/6 mt-2" />
          <Skeleton className="h-4 w-full mt-2" />
          <Skeleton className="h-4 w-5/6 mt-2" />
        </>
      ) : (
        <div className="" dangerouslySetInnerHTML={{ __html: text }} />
      )}
    </div>
  );
};

export default Qualification;
