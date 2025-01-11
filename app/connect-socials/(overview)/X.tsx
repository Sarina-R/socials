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
  image: string;
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
      <Carousel orientation="vertical" className="mt-12">
        <CarouselContent className="h-[500px]">
          {tweets.slice(0, 10).map((tweet) => (
            <CarouselItem key={tweet.id} className="pt-1 md:basis-1/2">
              <div className="p-1">
                <Card>
                  <CardContent className="p-4">
                    <p className="text-gray-800 text-sm">
                      {tweet.content_text}
                    </p>
                    <img
                      src={
                        tweet.image
                          ? tweet.image
                          : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPBZyPFWGE9-__tBi4XtLUii6dF_1Fi2BDsA&s"
                      }
                      className="w-full h-48 object-cover rounded-md"
                    />
                    <p className="text-xs text-gray-600 mt-2">
                      {new Date(tweet.date_published).toLocaleString()}
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
    </div>
  );
};

export default XFeed;
