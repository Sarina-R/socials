import { NextResponse } from "next/server";

const activity = [
  {
    id: 1,
    user: {
      name: "Amir 'Jadi' Mirmirani",
      profile_image:
        "https://esports.ch/wp-content/uploads/2024/11/jinx-arcane.jpg",
    },
    original_post: {
      author: {
        name: "Axiros",
        followers: 7559,
      },
      content:
        "[Axiros News] Axiros is Proud to Announce a New Release of their Telco WiFi Expert System – AXWIFI 2.7.1",
      image: "https://esports.ch/wp-content/uploads/2024/11/jinx-arcane.jpg",
      engagement: {
        likes: 145,
        comments: 2,
        reposts: 7,
      },
    },
    timestamp: "3 months ago",
  },
  {
    id: 2,
    user: {
      name: "Amir 'Jadi' Mirmirani",
      profile_image:
        "https://esports.ch/wp-content/uploads/2024/11/jinx-arcane.jpg",
    },
    original_post: {
      author: {
        name: "Negar Yaghoobi",
        title: "Entrepreneur | Consumer Engagement Strategist",
      },
      content:
        "Happy Friday! Quick update on my side project (indie hacking is cool!)",
      image: "https://esports.ch/wp-content/uploads/2024/11/jinx-arcane.jpg",
      engagement: {
        likes: 70,
        comments: 3,
        reposts: 1,
      },
    },
    timestamp: "3 months ago",
  },
  {
    id: 3,
    user: {
      name: "Amir 'Jadi' Mirmirani",
      profile_image:
        "https://esports.ch/wp-content/uploads/2024/11/jinx-arcane.jpg",
    },
    original_post: {
      author: {
        name: "Axiros",
        followers: 7559,
      },
      content:
        "[Axiros News] Axiros is Proud to Announce a New Release of their Telco WiFi Expert System – AXWIFI 2.7.1",
      image: "https://esports.ch/wp-content/uploads/2024/11/jinx-arcane.jpg",
      engagement: {
        likes: 145,
        comments: 2,
        reposts: 7,
      },
    },
    timestamp: "3 months ago",
  },
  {
    id: 4,
    user: {
      name: "Amir 'Jadi' Mirmirani",
      profile_image:
        "https://esports.ch/wp-content/uploads/2024/11/jinx-arcane.jpg",
    },
    original_post: {
      author: {
        name: "Negar Yaghoobi",
        title: "Entrepreneur | Consumer Engagement Strategist",
      },
      content:
        "Happy Friday! Quick update on my side project (indie hacking is cool!)",
      image: "https://esports.ch/wp-content/uploads/2024/11/jinx-arcane.jpg",
      engagement: {
        likes: 70,
        comments: 3,
        reposts: 1,
      },
    },
    timestamp: "3 months ago",
  },
];

export async function GET() {
  return NextResponse.json(activity);
}
