"use client";
import { ApiResponse } from "@/app/(dynamicPage)/home3/type";
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { API_URLS } from "@/app/api/url";

const DataContext = createContext<ApiResponse | null>(null);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<ApiResponse | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get<ApiResponse>(API_URLS.DYNAMIC_PAGE);
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    }
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={data}>
      {data ? children : <LoadingSpinner />}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within DataProvider");
  }
  return context;
};

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center text-white font-futura">
    <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin" />
  </div>
);
