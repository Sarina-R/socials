"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PostItem, User } from "../page";
import { API_URLS } from "@/app/api/url";
import "./instagram.scss";

const Instagram = ({ grid }: { grid: boolean }) => {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<PostItem[]>([]);

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
          console.log("user.home_page_url", user?.home_page_url);
          console.log("first");
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
      <div className="max-w-md mx-auto">
        <div className="facebook-header p-4 mb-2 bg-pink-600 text-white">
          Latest Instagram Posts
        </div>

        <div className="bg-white p-2 flex flex-row items-start">
          <div className="bg-blue-500 ml-3 mb-1 text-white rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
            <span className="text-2xl font-semibold">
              {user?.name.charAt(0)}
            </span>
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
            <iframe
              src={`${user?.home_page_url}embed`}
              height={500}
              className="w-full min-h-1 iframe"
            />
          )
        ) : (
          <>
            <div className="p-0 m-0">
              <iframe
                src={API_URLS.INSTAGRAM_IFRAME}
                height={500}
                className="w-full min-h-1 iframe"
              ></iframe>
            </div>
            <ScrollArea className="h-96 mt-3 bg-gray-100 rounded-b-lg"></ScrollArea>
          </>
        )}
      </div>
    </>
  );
};

export default Instagram;
