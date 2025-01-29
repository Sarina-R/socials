"use client";

import { usePathname } from "next/navigation";

export function Breadcrumbs() {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);

  return (
    <nav className="flex items-center text-sm text-gray-600 dark:text-gray-400 space-x-2">
      {paths.map((path, index) => (
        <span key={index} className="capitalize">
          {path}
          {index < paths.length - 1 && <span className="mx-1">/</span>}
        </span>
      ))}
    </nav>
  );
}
