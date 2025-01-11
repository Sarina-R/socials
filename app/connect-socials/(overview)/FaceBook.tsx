"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";

const FaceBook = () => {
  const [posts, setPosts] = useState<any[]>([]);

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
        console.error("Error fetching Facebook posts:", error);
      }
    };

    fetchFacebookPosts();
  }, []);

  return (
    <>
      <div className="facebook-header p-4 bg-blue-600 text-white">
        <h2 className="text-xl font-semibold">Latest Facebook Post</h2>
      </div>
      <div className="flex flex-col items-center min-h-screen mx-auto">
        <ScrollArea className="h-96 mt-3">
          <div className="space-y-4">
            {posts.slice(0, 10).map((post) => (
              <div key={post.id}>
                <Card className="max-w-md w-full shadow-lg rounded-lg overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-500 text-white rounded-full h-10 w-10 flex items-center justify-center">
                        {/* {post.authors.name.charAt(0)} */}
                        <img
                          src="https://pbs.twimg.com/profile_images/1446519556948860943/Gfr3E2iY_400x400.jpg"
                          alt="avatar"
                          className="rounded-full"
                        />
                      </div>
                      <div className="ml-4">
                        <p className="font-semibold">{post.authors.name}</p>
                        <p className="text-gray-600 text-sm">
                          {new Date(post.date_published).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-800">{post.content_text}</p>
                  </CardContent>
                  {post.image && (
                    <img
                      src={post.image}
                      className="w-full h-48 object-cover rounded-md p-3"
                    />
                  )}
                  {/* <CardFooter className="bg-gray-100 p-4 flex justify-between items-center">
                    <div className="text-gray-600">
                      <span className="font-semibold">{post.likes}</span>
                      Likes
                    </div>
                    <div className="text-gray-600">
                      <span className="font-semibold">{post.comments}</span>
                      Comments
                    </div>
                  </CardFooter> */}
                </Card>
              </div>
            ))}
          </div>
        </ScrollArea>
        {/* <div style={{ height: "600px", width: "100%" }}>
          <iframe
            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FKFC&tabs=timeline&width=500&height=600&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true"
            width="100%"
            height="100%"
            style={{ border: "none", overflow: "hidden" }}
            scrolling="no"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          ></iframe>
        </div> */}
      </div>
    </>
  );
};

export default FaceBook;
