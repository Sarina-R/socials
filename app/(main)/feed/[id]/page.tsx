"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { API_URLS } from "@/app/api/url";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";

interface Feed {
  id: number;
  name: string;
  description: string;
  monthOfJoin: string;
  avatar: string;
  position: string;
  timeOfPost: string;
}

const FeedDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Feed | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(API_URLS.ADMINS);
        const postDetail = response.data.find(
          (item: Feed) => item.id === Number(id)
        );
        setPost(postDetail);
      } catch (error) {
        console.error("Error fetching post details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const formatTime = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto mt-10">
        <div className="flex items-center space-x-4">
          <Skeleton className="w-16 h-16 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="w-1/3 h-6" />
            <Skeleton className="w-1/2 h-5" />
            <Skeleton className="w-1/4 h-4" />
          </div>
        </div>
        <Skeleton className="w-full h-24 mt-4" />
        <Skeleton className="w-1/2 h-5 mt-3" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-2xl mx-auto mt-10 p-6 text-center text-red-500 text-lg font-semibold">
        Post not found
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="flex items-center space-x-4">
        <Avatar className="w-16 h-16">
          <AvatarImage src={post.avatar} alt={post.name} />
          <AvatarFallback>{post.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {post.name}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {post.position}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Joined: {post.monthOfJoin}
          </p>
        </div>
      </div>
      <p className="mt-4 text-gray-700 dark:text-gray-300">
        {post.description}
      </p>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Posted on: {formatTime(post.timeOfPost)}
      </p>
    </div>
  );
};

export default FeedDetail;
