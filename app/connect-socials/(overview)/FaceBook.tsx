"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";

interface Post {
  id: string;
  title: string;
  content_text: string;
  content_html?: string;
  date_published: string;
  authors: { name: string }[];
  image?: string;
  url: string;
}

const FaceBook = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchFacebookPosts = async () => {
      try {
        const response = await axios.get(
          "https://rss.app/feeds/v1.1/1BMCz5MICRhTObh2.json"
        );
        if (response.data?.items) {
          setPosts(response.data.items);
        }
      } catch (error) {
        setError("Error fetching Facebook posts");
      } finally {
        setLoading(false);
      }
    };

    fetchFacebookPosts();
  }, []);

  if (loading) {
    return <p className="text-center mt-4 text-gray-600">Loading posts...</p>;
  }

  if (error) {
    return <p className="text-center mt-4 text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="p-4 bg-blue-600 text-white">
        <h2 className="text-xl font-semibold text-center">Facebook Posts</h2>
      </div>

      {/* Posts Feed */}
      <div className="flex flex-col items-center py-6">
        <ScrollArea className="w-full max-w-3xl px-4 space-y-6">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="bg-white shadow-md rounded-lg overflow-hidden transition hover:shadow-lg"
            >
              {/* Post Header */}
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  {/* Profile Avatar */}
                  <div className="flex-shrink-0">
                    <img
                      src="https://static.xx.fbcdn.net/rsrc.php/yz/r/KFyVIAWzntM.ico"
                      alt="Avatar"
                      className="w-12 h-12 rounded-full"
                    />
                  </div>
                  {/* User Info */}
                  <div>
                    <p className="font-semibold">
                      {post.authors[0]?.name || "Unknown"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(post.date_published).toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>

              {/* Post Content */}
              <CardContent className="p-4">
                <p className="text-gray-800">{post.content_text}</p>
                {post.image && (
                  <img
                    src={post.image}
                    alt="Post Content"
                    className="mt-4 rounded-lg w-full object-cover"
                  />
                )}
              </CardContent>

              {/* Post Footer (Actions) */}
              <CardFooter className="bg-gray-50 px-4 py-2 flex justify-between text-sm text-gray-600">
                <button className="flex items-center gap-2 hover:text-blue-600">
                  👍 Like
                </button>
                <button className="flex items-center gap-2 hover:text-blue-600">
                  💬 Comment
                </button>
                <button className="flex items-center gap-2 hover:text-blue-600">
                  🔗 Share
                </button>
              </CardFooter>
            </Card>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
};

export default FaceBook;
