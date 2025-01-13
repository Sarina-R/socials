"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { ScrollArea } from "@/components/ui/scroll-area";
import "./instagram.scss";

const Instagram = ({ grid }: { grid: boolean }) => {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchInstagramPosts = async () => {
      try {
        const response = await axios.get("/api/proxy");
        if (response.data?.items) {
          setPosts(response.data.items);
          console.log("posts", posts);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchInstagramPosts();
  }, []);

  return (
    <>
      {grid ? (
        <div className="max-w-md mx-auto">
          <div className="instagram-header bg-pink-600 p-4 text-white">
            <h2 className="text-xl font-semibold">Latest Instagram Posts</h2>
          </div>

          <div className="p-0 m-0">
            <iframe
              // src="api/proxy"
              src="https://rss.app/embed/v1/feed/JMworoRtNfxVrUth"
              height={500}
              className="w-full min-h-1 iframe"
            ></iframe>
          </div>
          <ScrollArea className="h-96 mt-3 bg-gray-100 rounded-b-lg"></ScrollArea>
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
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-md mb-2"
                  />
                  <p className="text-sm">{post.title}</p>
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
