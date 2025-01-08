"use client";

import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

const Instagram = ({ grid }: { grid: boolean }) => {
  const [posts, setPosts] = useState<any[]>([
    {
      imageUrl:
        "https://gratisography.com/wp-content/uploads/2024/10/gratisography-cool-cat-800x525.jpg",
      caption: "Post 1",
    },
    {
      imageUrl:
        "https://gratisography.com/wp-content/uploads/2024/10/gratisography-cool-cat-800x525.jpg",
      caption: "Post 2",
    },
    {
      imageUrl:
        "https://gratisography.com/wp-content/uploads/2024/10/gratisography-cool-cat-800x525.jpg",
      caption: "Post 3",
    },
    {
      imageUrl:
        "https://gratisography.com/wp-content/uploads/2024/10/gratisography-cool-cat-800x525.jpg",
      caption: "Post 4",
    },
    {
      imageUrl:
        "https://gratisography.com/wp-content/uploads/2024/10/gratisography-cool-cat-800x525.jpg",
      caption: "Post 5",
    },
  ]);

  return (
    <>
      {grid ? (
        <div className="max-w-md mx-auto">
          <div className="instagram-header bg-pink-600 p-4 text-white">
            <h2 className="text-xl font-semibold">Latest Instagram Posts</h2>
          </div>

          <ScrollArea className="h-96 mt-3 bg-gray-100 rounded-b-lg">
            <div className="grid grid-cols-3 gap-1">
              {posts.slice(0, 10).map((post, index) => (
                <img
                  key={index}
                  src={post.imageUrl}
                  alt={post.caption}
                  className="w-full aspect-[1/1] object-cover "
                />
              ))}
            </div>
          </ScrollArea>
        </div>
      ) : (
        <div className="max-w-md mx-auto">
          <div className="instagram-header bg-pink-600 p-4 text-white">
            <h2 className="text-xl font-semibold">Latest Instagram Posts</h2>
          </div>
          <ScrollArea className="h-96 mt-3">
            <div className="space-y-4 ">
              {posts.slice(0, 10).map((post, index) => (
                <div
                  key={index}
                  className="p-4  bg-white border rounded-lg shadow-sm"
                >
                  <img
                    src={post.imageUrl}
                    alt={post.caption}
                    className="w-full h-48 object-cover rounded-md mb-2"
                  />
                  <p className="text-sm">{post.caption}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </>
  );
};

export default Instagram;
