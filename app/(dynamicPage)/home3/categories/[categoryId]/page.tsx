// app/categories/[categoryId]/page.tsx
"use client";

import { useData } from "@/hooks/DataProvider";
import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function CategoryPage() {
  //   const data = useData();
  //   const params = useParams();
  //   const categoryId = params?.categoryId as string;

  //   console.log("Rendering CategoryPage");
  //   console.log("params", params);
  //   console.log("categoryId", categoryId);
  //   console.log("data", data);

  //   if (!data) {
  //     console.log("Data is null, showing loading spinner");
  //     return (
  //       <div className="min-h-screen flex items-center justify-center text-white font-futura">
  //         <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin" />
  //       </div>
  //     );
  //   }

  //   const categoriesSection = data.sections.find(
  //     (section) => section.type === "categories"
  //   );
  //   console.log("categoriesSection", categoriesSection);

  //   const category = categoriesSection?.items.find(
  //     (cat) => cat.id === Number(categoryId)
  //   );
  //   console.log("category", category);

  //   if (!category) {
  //     console.log("Category not found for ID:", categoryId);
  //     notFound();
  //   }

  //   const primaryColor = data.brand.primaryColor || "#7338A0";

  return (
    <div className="container mx-auto py-10 px-4">
      {/* <h1 className="text-4xl font-bold mb-6" style={{ color: primaryColor }}>
        {category.name}
      </h1>
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="flex-1">
          <Image
            src={category.img}
            alt={category.name}
            width={600}
            height={400}
            className="object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="flex-1">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Explore the challenges under {category.name}. This category includes{" "}
            {category.items.length} exciting events.
          </p>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <p className="text-sm">
              <strong>Category ID:</strong> {category.id}
            </p>
          </div>
        </div>
      </div>

      <h2
        className="text-2xl font-semibold mb-4"
        style={{ color: primaryColor }}
      >
        Challenges
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {category.items.map((item) => (
          <Link
            href={`/categories/${category.id}/${item.id}`}
            key={item.id}
            className="block"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <Image
                src={item.img}
                alt={item.title}
                width={300}
                height={200}
                className="object-cover w-full h-48"
              />
              <div className="p-4">
                <h3
                  className="text-lg font-semibold"
                  style={{ color: primaryColor }}
                >
                  {item.title}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div> */}
      mew{" "}
    </div>
  );
}
