"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode } from "react";

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme: string;
}

export function ThemeProvider({ children, defaultTheme }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      disableTransitionOnChange
      defaultTheme={defaultTheme}
      enableSystem
    >
      {children}
    </NextThemesProvider>
  );
}
