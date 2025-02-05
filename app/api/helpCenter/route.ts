import { NextResponse } from "next/server";

const helpCenterData = [
  {
    title: "Getting Started",
    iconUrl:
      "https://tribe-s3-production.imgix.net/prejBMPH4Yy5SRtNNzxkS?w=1000&auto=compress",
    links: [
      { id: 1, title: "How to get Support" },
      { id: 2, title: "Community's access settings" },
      { id: 3, title: "Use Keyboard Shortcuts" },
    ],
  },
  {
    title: "Account & Billing",
    iconUrl:
      "https://tribe-s3-production.imgix.net/prejBMPH4Yy5SRtNNzxkS?w=1000&auto=compress",
    links: [
      { id: 4, title: "Accessing your billing details" },
      { id: 5, title: "Bettermode's Pricing and Plans" },
      { id: 6, title: "Forgot your password?" },
    ],
  },
  {
    title: "Getting Started1",
    iconUrl:
      "https://tribe-s3-production.imgix.net/prejBMPH4Yy5SRtNNzxkS?w=1000&auto=compress",
    links: [
      { id: 1, title: "How to get Support" },
      { id: 2, title: "Community's access settings" },
      { id: 3, title: "Use Keyboard Shortcuts" },
    ],
  },
  {
    title: "Account & Billing1",
    iconUrl:
      "https://tribe-s3-production.imgix.net/prejBMPH4Yy5SRtNNzxkS?w=1000&auto=compress",
    links: [
      { id: 4, title: "Accessing your billing details" },
      { id: 5, title: "Bettermode's Pricing and Plans" },
      { id: 6, title: "Forgot your password?" },
    ],
  },
];

export async function GET() {
  return NextResponse.json(helpCenterData);
}
