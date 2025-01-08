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

interface Tweet {
  id: string;
  text: string;
  created_at: string;
}

const XFeed = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const token = process.env.TWITTER_BEARER_TOKEN;

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await axios.get("/api/connect-socials/tweets");
        setTweets(response.data.data);
      } catch (error) {
        setError("Failed");
      } finally {
        setLoading(false);
      }
    };
    console.log("token", token);
    fetchTweets();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="instagram-header h-[60px] mb-5 bg-blue-600 p-4 text-white">
        <h2 className="text-xl font-semibold">Latest Tweets</h2>
      </div>
      <Carousel orientation="vertical" className="mt-12">
        <CarouselContent className="h-[300px]">
          {tweets.map((tweet) => (
            <CarouselItem key={tweet.id} className="pt-1 md:basis-1/2">
              <div className="p-1">
                <Card>
                  <CardContent className="p-4">
                    <p className="text-gray-800">{tweet.text}</p>
                    <p className="text-xs text-gray-600 mt-2">
                      {new Date(tweet.created_at).toLocaleString()}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default XFeed;
