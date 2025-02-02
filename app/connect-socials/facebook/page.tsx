"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { API_URLS } from "@/app/api/url";
import { User, PostItem, FacebookResponse } from "../type";
import axios from "axios";
import Image from "next/image";

const FaceBook = () => {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<PostItem[]>([]);

  useEffect(() => {
    const fetchFacebookPosts = async () => {
      try {
        const response = await axios.get<FacebookResponse>(API_URLS.FACEBOOK);
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
        console.error("Error fetching Facebook posts:", error);
      }
    };

    fetchFacebookPosts();
  }, []);

  return (
    <>
      <div className="facebook-header p-4 mb-2 text-white bg-blue-600 dark:bg-blue-800">
        Latest Facebook Posts
      </div>

      <div className="p-2 flex flex-col lg:flex-row items-start">
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
            Visit Facebook Group
          </a>
        </div>
      </div>

      <div className="flex flex-col items-center min-h-screen mx-auto">
        <div className="space-y-4 mt-4">
          {posts.map((post) => (
            <div key={post.id}>
              <Card className="max-w-md w-full shadow-lg rounded-lg overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-500 text-white rounded-full h-10 w-10 flex items-center justify-center">
                      {post.favicon ? (
                        <Image
                          src={post.favicon}
                          alt="post avatar"
                          className="rounded-full"
                        />
                      ) : (
                        <span className="text-xl">
                          {post.authors[0].name.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div className="ml-4">
                      <p className="font-semibold">{post.authors[0].name}</p>
                      <p className="text-gray-600 text-sm">
                        {new Date(post.date_published).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-800 dark:text-gray-300">
                    {post.content_text}
                  </p>
                </CardContent>
                {post.image && (
                  <img
                    src={post.image}
                    className="w-full h-48 object-cover rounded-md p-3"
                    alt="post image"
                  />
                )}
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FaceBook;
