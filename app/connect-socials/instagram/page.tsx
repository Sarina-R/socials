"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { ScrollArea } from "@/components/ui/scroll-area";
import { API_URLS } from "@/app/api/url";
import { PostItem, User } from "../type";
import "./instagram.scss";

const Instagram = () => {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [grid, setGrid] = useState(false);

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
          setPosts(response.data);
          console.log(posts);
        }
      } catch (error) {
        console.error("Error fetching Facebook posts:", error);
      }
    };
    console.log("user.home_page_url", user?.home_page_url);

    fetchInstagramPosts();
  }, []);

  return (
    <>
      <div className="facebook-header p-4 mb-2 text-white bg-pink-600 dark:bg-pink-700">
        Latest Instagram Posts
      </div>

      <div className="p-2 flex flex-row items-start shadow-md mb-3">
        <div className="bg-blue-500 ml-3 mb-1 text-white rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
          <span className="text-2xl font-semibold">{user?.name.charAt(0)}</span>
        </div>

        <div className="ml-4">
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

      {grid ? (
        user?.home_page_url && (
          <div className="flex flex-col items-center min-h-screen mx-auto">
            <iframe
              src={`${user?.home_page_url}embed`}
              height={500}
              className="w-full min-h-1 iframe"
            />
          </div>
        )
      ) : (
        <>
          <iframe
            src={API_URLS.INSTAGRAM_IFRAME}
            height={500}
            className="m-auto w-96"
          ></iframe>
        </>
      )}
    </>
  );
};

export default Instagram;
