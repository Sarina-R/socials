import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const latestPost = [
  {
    author: "John Doe",
    content: "Just had an amazing day at the beach!",
    timestamp: "2 hours ago",
    likes: 120,
    comments: 45,
    imageUrl:
      "https://gratisography.com/wp-content/uploads/2024/10/gratisography-cool-cat-800x525.jpg",
  },
  {
    author: "John Doe 1",
    content: "Just had an amazing day at the beach!",
    timestamp: "2 hours ago",
    likes: 120,
    comments: 45,
    imageUrl:
      "https://gratisography.com/wp-content/uploads/2024/10/gratisography-cool-cat-800x525.jpg",
  },
  {
    author: "John Doe 2",
    content: "Just had an amazing day at the beach!",
    timestamp: "2 hours ago",
    likes: 120,
    comments: 45,
    imageUrl:
      "https://gratisography.com/wp-content/uploads/2024/10/gratisography-cool-cat-800x525.jpg",
  },
  {
    author: "John Doe 3",
    content: "Just had an amazing day at the beach!",
    timestamp: "2 hours ago",
    likes: 120,
    comments: 45,
    imageUrl:
      "https://gratisography.com/wp-content/uploads/2024/10/gratisography-cool-cat-800x525.jpg",
  },
];

const topPosts = latestPost.slice(0, 10);
const FaceBook = () => {
  return (
    <>
      <div className="facebook-header p-4 bg-blue-600 text-white">
        <h2 className="text-xl font-semibold">Latest Facebook Post</h2>
      </div>
      <div className="flex flex-col items-center min-h-screen mx-auto">
        <ScrollArea className="h-96 mt-3">
          <div className="space-y-4">
            {topPosts.map((latestPost, index) => (
              <div key={index}>
                <Card className="max-w-md w-full shadow-lg rounded-lg overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-500 text-white rounded-full h-10 w-10 flex items-center justify-center">
                        {latestPost.author.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <p className="font-semibold">{latestPost.author}</p>
                        <p className="text-gray-600 text-sm">
                          {latestPost.timestamp}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-800">{latestPost.content}</p>
                  </CardContent>
                  <img
                    src={latestPost.imageUrl}
                    className="w-full h-48 object-cover rounded-md p-3"
                  />
                  <CardFooter className="bg-gray-100 p-4 flex justify-between items-center">
                    <div className="text-gray-600">
                      <span className="font-semibold">{latestPost.likes}</span>
                      Likes
                    </div>
                    <div className="text-gray-600">
                      <span className="font-semibold">
                        {latestPost.comments}
                      </span>
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
