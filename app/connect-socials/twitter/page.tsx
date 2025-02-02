"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { API_URLS } from "@/app/api/url";
import { PostItem, User } from "../type";
import axios from "axios";

const XFeed = () => {
  const [user, setUser] = useState<User | null>(null);
  const [tweets, setTweets] = useState<PostItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await axios.get(API_URLS.TWEETER);
        if (response.data) {
          setUser({
            name: response.data.title,
            description: response.data.description,
            home_page_url: response.data.home_page_url,
            favicon: response.data.favicon,
          });
          setTweets(response.data.items);
        }
      } catch (error) {
        console.error("Error fetching Facebook posts:", error);
        setError("Error");
      } finally {
        setLoading(false);
      }
    };
    fetchTweets();
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="facebook-header p-4 mb-2 bg-sky-600 text-white">
        Latest X Posts
      </div>

      {loading ? (
        <p>Loading ...</p>
      ) : (
        <div>
          <div className="shadow-md mb-1 p-2 flex flex-row items-start">
            <div className="bg-blue-500 ml-3 mb-1 text-white rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
              <span className="text-2xl font-semibold">
                {user?.name.charAt(0)}
              </span>
            </div>

            <div className="ml-4">
              <p className="text-sm font-bold">{user?.name}</p>
              <a
                href={user?.home_page_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 text-xs hover:underline"
              >
                Visit Tweeter
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center min-h-screen mx-auto">
            <div className="space-y-4 mt-4">
              {tweets.map((tweet, index) => (
                <Card
                  key={tweet.id || index}
                  className="max-w-md w-full shadow-lg rounded-lg overflow-hidden"
                >
                  <CardContent className="p-3">
                    <div className="flex flex-col lg:flex-row items-start gap-4">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLXU3Sxn8X1sdn2wuTi16y_jFiX6ZjOfa_WQ&s"
                        alt="User Avatar"
                        className="w-12 h-12 md:w-10 md:h-10 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-sm">@FiraCup</h4>
                          <span className="text-xs text-gray-500">
                            {new Date(
                              tweet.date_published
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-800 mt-1 dark:text-gray-400">
                          {tweet.content_text}
                        </p>
                        {tweet.image && (
                          <img
                            src={tweet.image}
                            alt="Tweet Image"
                            className="mt-2 rounded-md w-full max-h-80 object-cover"
                          />
                        )}
                        <a
                          href={tweet.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 text-sm mt-2 block hover:underline"
                        >
                          View on Twitter
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default XFeed;
