import axios from "axios";
import { NextResponse } from "next/server";

const INSTAGRAM_API_URL = "https://graph.instagram.com/me/media";
const ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;

export async function GET() {
  try {
    const response = await axios.get(INSTAGRAM_API_URL, {
      params: {
        fields: "id,caption,media_type,media_url,thumbnail_url,timestamp",
        access_token: ACCESS_TOKEN,
      },
    });

    const posts = response.data.data.map((post: any) => ({
      id: post.id,
      caption: post.caption,
      imageUrl:
        post.media_type === "IMAGE" ? post.media_url : post.thumbnail_url,
    }));

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Error fetching Instagram posts:", error);
    return NextResponse.json(
      { error: "Error fetching posts" },
      { status: 500 }
    );
  }
}
