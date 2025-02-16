import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, MessageCircle, Repeat } from "lucide-react";

interface ActivityProps {
  activity: {
    user: {
      name: string;
      profile_image: string;
    };
    original_post: {
      author: {
        name: string;
        followers?: number;
        title?: string;
      };
      content: string;
      image: string;
      engagement: {
        likes: number;
        comments: number;
        reposts: number;
      };
    };
    timestamp: string;
  };
}

const Activity = ({ activity }: ActivityProps) => {
  return (
    <Card className="rounded-lg border-non w-96 shadow-md p-4">
      <div className="flex items-center space-x-3">
        <Image
          src={activity.user.profile_image}
          alt={activity.user.name}
          width={40}
          height={40}
          className="rounded-full"
        />
        <div>
          <p className="text-sm font-semibold">{activity.user.name}</p>
          <p className="text-xs text-gray-500">{activity.timestamp}</p>
        </div>
      </div>

      <CardContent className="mt-3">
        <div className="mb-3">
          <p className="font-semibold">{activity.original_post.author.name}</p>
          {activity.original_post.author.followers && (
            <p className="text-xs text-gray-500">
              {activity.original_post.author.followers} followers
            </p>
          )}
          {activity.original_post.author.title && (
            <p className="text-xs text-gray-500">
              {activity.original_post.author.title}
            </p>
          )}
          <p className="text-sm mt-1">{activity.original_post.content}</p>
        </div>

        <div className="rounded-lg overflow-hidden">
          <Image
            src={activity.original_post.image}
            alt="Post Image"
            width={500}
            height={300}
            className="w-full object-cover"
          />
        </div>

        <div className="flex justify-between items-center text-gray-600 text-sm mt-2">
          <div className="flex items-center space-x-2">
            <Heart className="w-4 h-4" />
            <span>{activity.original_post.engagement.likes}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MessageCircle className="w-4 h-4" />
            <span>{activity.original_post.engagement.comments}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Repeat className="w-4 h-4" />
            <span>{activity.original_post.engagement.reposts}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Activity;
