import { NextResponse } from "next/server";

const helpCenterData = [
  {
    title: "Getting Started",
    iconUrl:
      "https://tribe-s3-production.imgix.net/prejBMPH4Yy5SRtNNzxkS?w=1000&auto=compress",
    links: [
      "How to get Support",
      "Community's access settings",
      "Use Keyboard Shortcuts",
    ],
  },
  {
    title: "Account & Billing",
    iconUrl:
      "https://tribe-s3-production.imgix.net/prejBMPH4Yy5SRtNNzxkS?w=1000&auto=compress",
    links: [
      "Accessing your billing details",
      "Bettermode's Pricing and Plans",
      "Forgot your password?",
    ],
  },
  {
    title: "Getting Started",
    iconUrl:
      "https://tribe-s3-production.imgix.net/prejBMPH4Yy5SRtNNzxkS?w=1000&auto=compress",
    links: [
      "How to get Support",
      "Community's access settings",
      "Use Keyboard Shortcuts",
    ],
  },
  {
    title: "Account & Billing",
    iconUrl:
      "https://tribe-s3-production.imgix.net/prejBMPH4Yy5SRtNNzxkS?w=1000&auto=compress",
    links: [
      "Accessing your billing details",
      "Bettermode's Pricing and Plans",
      "Forgot your password?",
    ],
  },
];

export async function GET() {
  return NextResponse.json(helpCenterData);
}
