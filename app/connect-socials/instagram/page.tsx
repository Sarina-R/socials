"use client";

import { useState, useEffect } from "react";
import { API_URLS } from "@/app/api/url";
import { PostItem, User } from "../type";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Image from "next/image";

const Instagram = () => {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [expandedCaptions, setExpandedCaptions] = useState<string | null>(null);

  useEffect(() => {
    const fetchInstagramPosts = async () => {
      try {
        const response = await axios.get(API_URLS.INSTAGRAM);
        if (response.data) {
          setUser({
            name: response.data.title,
            description: response.data.description,
            home_page_url: response.data.home_page_url,
            favicon: response.data.favicon,
          });
          setPosts(response.data.items);
        }
      } catch (error) {
        console.error("Error fetching Instagram posts:", error);
      }
    };
    fetchInstagramPosts();
  }, []);

  return (
    <>
      <div className="p-4 mb-2 text-white bg-pink-600 dark:bg-pink-700 text-center">
        <h2 className="text-lg font-semibold">Latest Instagram Posts</h2>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start p-4 shadow-md mb-3">
        <div className="flex flex-col md:flex-row w-full md:w-3/4">
          <div className="bg-blue-500 text-white rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
            <span className="text-2xl font-semibold">
              {user?.name.charAt(0)}
            </span>
          </div>
          <div className="mt-3 md:ml-4 md:mt-0">
            <p className="font-semibold text-lg">{user?.name}</p>
            <p className="text-sm text-gray-500">{user?.description}</p>
            <a
              href={user?.home_page_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 text-xs hover:underline"
            >
              Visit Instagram Group
            </a>
          </div>
        </div>

        <div className="w-full md:w-1/4 flex justify-start md:justify-end mt-3 md:mt-0">
          <ToggleGroup
            type="single"
            value={view}
            onValueChange={(value) => setView(value as "grid" | "list")}
          >
            <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
            <ToggleGroupItem value="list">List</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>

      {view === "grid" ? (
        <div className="grid grid-cols-3 gap-2 max-w-2xl m-auto p-2">
          {posts.map((post) => (
            <div
              key={post.id}
              className="relative w-full max-w-xs aspect-square"
            >
              <Image
                src={post.image ?? ""}
                alt={post.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="p-2 max-w-2xl m-auto">
          {posts.map((post) => (
            <div key={post.id} className="mb-4 p-4 rounded-md shadow">
              <Image
                src={post.image ?? ""}
                alt={post.title}
                width={400}
                height={400}
                className="m-auto"
              />
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                {expandedCaptions === post.id ? (
                  post.content_text
                ) : (
                  <>
                    {post.title.slice(0, 200)}
                    <Button
                      variant="link"
                      className="text-blue-500 text-xs"
                      onClick={() => setExpandedCaptions(post.id)}
                    >
                      Show more
                    </Button>
                  </>
                )}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Instagram;
