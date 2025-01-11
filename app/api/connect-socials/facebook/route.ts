import axios from "axios";
import { NextResponse } from "next/server";

// const FACEBOOK_API_URL = "https://graph.facebook.com/v15.0/me/feed";
const ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN;
const FACEBOOK_API_URL = `https://graph.facebook.com/v16.0/me/posts?access_token=${ACCESS_TOKEN}`;

export async function GET() {
  try {
    // const response = await axios.get(FACEBOOK_API_URL, {
    //   params: {
    //     access_token: ACCESS_TOKEN,
    //     fields: "id,message,created_time,shares,comments,likes,picture",
    //   },
    // });

    const response = await axios.get(FACEBOOK_API_URL);

    const posts = response.data.data.map((post: any) => ({
      id: post.id,
      content: post.message,
      timestamp: post.created_time,
      likes: post.likes ? post.likes.summary.total_count : 0,
      comments: post.comments ? post.comments.summary.total_count : 0,
      imageUrl: post.picture,
    }));

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Error fetching Facebook posts:", error);
    return NextResponse.json(
      { error: "Error fetching posts" },
      { status: 500 }
    );
  }
}
