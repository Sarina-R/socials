// app/categories/[categoryId]/[itemId]/page.tsx
"use client";

import { useData } from "@/hooks/DataProvider";
import { notFound } from "next/navigation";
import Image from "next/image";

interface ItemPageProps {
  params: {
    categoryId: string;
    itemId: string;
  };
}

export default function ItemPage({ params }: ItemPageProps) {
  const data = useData();
  const { categoryId, itemId } = params;

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white font-futura">
        <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin" />
      </div>
    );
  }

  const category = data.sections
    .find((section) => section.type === "categories")
    ?.items.find((cat) => cat.id === Number(categoryId));

  const item = category?.items.find((i) => i.id === Number(itemId));

  if (!category || !item) {
    notFound();
  }

  const primaryColor = data.brand.primaryColor || "#c1102d";

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-6" style={{ color: primaryColor }}>
        {item.title}
      </h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <Image
            src={item.img}
            alt={item.title}
            width={600}
            height={400}
            className="object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="flex-1">
          <h2
            className="text-2xl font-semibold mb-4"
            style={{ color: primaryColor }}
          >
            {category.name}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            This is {item.title}, part of the {category.name} category. Add more
            details about this challenge here.
          </p>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <p className="text-sm">
              <strong>Category ID:</strong> {category.id}
            </p>
            <p className="text-sm">
              <strong>Item ID:</strong> {item.id}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
