"use client";

import { API_URLS } from "@/app/api/url";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import Link from "next/link";

interface Feed {
  id: number;
  name: string;
  description: string;
  timeOfPost: string;
  avatar: string;
  position: string;
}

const FeedPage = () => {
  const [feed, setFeed] = useState<Feed[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URLS.ADMINS);
        setFeed(response.data);
      } catch (error) {
        console.log("Error fetching feed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatTime = (isoDate: string) => {
    const date = new Date(isoDate);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    const diffInDays = Math.floor(diffInSeconds / (60 * 60 * 24));

    if (diffInDays > 3) {
      return date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
      });
    } else if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    } else if (diffInSeconds < 86400) {
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    } else {
      return `${diffInDays} days ago`;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-6 space-y-4">
      {loading
        ? Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} className="p-4 rounded-lg">
              <div className="flex items-start space-x-4">
                <Skeleton className="w-12 h-12 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-1/3 rounded" />
                  <Skeleton className="h-3 w-1/4 rounded" />
                  <Skeleton className="h-4 w-1/2 rounded" />
                  <Skeleton className="h-3 w-full rounded" />
                  <Skeleton className="h-3 w-3/4 rounded" />
                  <div className="flex space-x-2 pt-2">
                    <Skeleton className="h-8 w-16 rounded" />
                    <Skeleton className="h-8 w-16 rounded" />
                    <Skeleton className="h-8 w-16 rounded" />
                  </div>
                </div>
              </div>
            </Card>
          ))
        : feed.map((post) => (
            <Card key={post.id} className="p-4 rounded-lg">
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage src={post.avatar} alt={post.name} />
                  <AvatarFallback>{post.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Link href={`/feed/${post.id}`}>
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">{post.name}</h3>
                      <span className="text-sm text-neutral-500">
                        {formatTime(post.timeOfPost)}
                      </span>
                    </div>
                  </Link>

                  <p className="text-sm text-neutral-700 dark:text-neutral-400">
                    {post.position}
                  </p>
                  <p className="mt-2">{post.description}</p>
                  <div className="flex mt-3 space-x-2">
                    <Button size="sm">Upvote</Button>
                    <Button size="sm">Follow</Button>
                    <Button size="sm">Share</Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
    </div>
  );
};

export default FeedPage;
