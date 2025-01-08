import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";

const FaceBook = () => {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchFacebookPosts = async () => {
      try {
        const response = await axios.get("/api/connect-socials/facebook");
        if (response.data?.posts) {
          setPosts(response.data.posts);
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
            {posts.slice(0, 10).map((post, index) => (
              <div key={index}>
                <Card className="max-w-md w-full shadow-lg rounded-lg overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-500 text-white rounded-full h-10 w-10 flex items-center justify-center">
                        {post.author.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <p className="font-semibold">{post.author}</p>
                        <p className="text-gray-600 text-sm">
                          {new Date(post.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-800">{post.content}</p>
                  </CardContent>
                  <img
                    src={post.imageUrl}
                    className="w-full h-48 object-cover rounded-md p-3"
                  />
                  <CardFooter className="bg-gray-100 p-4 flex justify-between items-center">
                    <div className="text-gray-600">
                      <span className="font-semibold">{post.likes}</span>
                      Likes
                    </div>
                    <div className="text-gray-600">
                      <span className="font-semibold">{post.comments}</span>
                      Comments
                    </div>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </>
  );
};

export default FaceBook;
