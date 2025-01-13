"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import axios from "axios";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Tweet {
  id: string;
  content_text: string;
  date_published: string;
  image?: string;
  url: string;
  authors: { name: string }[];
}

const XFeed = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await axios.get(
          "https://rss.app/feeds/v1.1/r2ERafSiD9lpQLyH.json"
        );
        setTweets(response.data.items);
      } catch (error) {
        setError("Failed");
      } finally {
        setLoading(false);
      }
    };
    fetchTweets();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="instagram-header h-[60px] mb-5 bg-blue-600 p-4 text-white">
        <h2 className="text-xl font-semibold">Latest Tweets</h2>
      </div>
      {/* <a
        className="twitter-timeline"
        data-lang="en"
        data-width="300"
        data-height="500"
        data-theme="dark"
        href="https://twitter.com/FiraCup?ref_src=twsrc%5Etfw"
      >
        Tweets by FiraCup
      </a>{" "}
      <script async src="https://platform.twitter.com/widgets.js"></script> */}
      <div>
        <ScrollArea className="h-96">
          {tweets.map((tweet) => (
            <Card
              key={tweet.id}
              className="bg-white mt-3 shadow-sm rounded-lg transition hover:shadow-md"
            >
              <CardContent className="p-3">
                <div className="flex flex-col lg:flex-row items-start gap-4">
                  <img
                    src="https://pbs.twimg.com/profile_images/1446519556948860943/Gfr3E2iY_normal.jpg"
                    alt="User Avatar"
                    className="w-12 h-12 md:w-10 md:h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-sm">@FiraCup</h4>
                      <span className="text-xs text-gray-500">
                        {new Date(tweet.date_published).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-800 mt-1">
                      {tweet.content_text}
                    </p>
                    {tweet.image && (
                      <img
                        src={tweet.image}
                        alt="Tweet Image"
                        className="mt-2 rounded-md w-full max-h-80 object-cover"
                      />
                    )}
                    {/* Tweet Link */}
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
        </ScrollArea>
      </div>
    </div>
  );
};

export default XFeed;
