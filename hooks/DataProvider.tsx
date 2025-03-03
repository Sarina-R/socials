"use client";

import { ApiResponse } from "@/app/(dynamicPage)/home3/type";
import React, { createContext, useContext } from "react";

const DataContext = createContext<ApiResponse | null>(null);

export const DataProvider = ({
  children,
  data,
}: {
  children: React.ReactNode;
  data: ApiResponse;
}) => {
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within DataProvider");
  }
  return context;
};
