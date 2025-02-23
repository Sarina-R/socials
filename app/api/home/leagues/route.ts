import { NextResponse } from "next/server";

const leagues = {
  "FIRA Youth": [
    {
      title: "Innovation & Creativity (Youth)",
      category: ["Youth (U14)", "Youth (U19)"],
      image:
        "https://events.avisengine.com/_next/image?url=https%3A%2F%2Fapi.avisengine.com%2Fassets%2F18dbf7a9-bd4d-44ea-9cd6-8f70c08aad83&w=384&q=75",
      registrationStatus: "Open",
    },
    {
      title: "Cliff Hanger Heavyweight",
      category: ["Youth (U14)", "Youth (U19)"],
      image:
        "https://events.avisengine.com/_next/image?url=https%3A%2F%2Fapi.avisengine.com%2Fassets%2Fb9d97807-cfc4-4b7c-83fa-1b8a8a97d03d&w=256&q=75",
      registrationStatus: "Open",
    },
    {
      title: "Cliff Hanger Lightweight",
      category: ["Youth (U14)", "Youth (U19)"],
      image:
        "https://events.avisengine.com/_next/image?url=https%3A%2F%2Fapi.avisengine.com%2Fassets%2F18dbf7a9-bd4d-44ea-9cd6-8f70c08aad83&w=384&q=75",
      registrationStatus: "Open",
    },
    {
      title: "Innovation & Creativity (Youth)",
      category: ["Youth (U14)", "Youth (U19)"],
      image:
        "https://events.avisengine.com/_next/image?url=https%3A%2F%2Fapi.avisengine.com%2Fassets%2F18dbf7a9-bd4d-44ea-9cd6-8f70c08aad83&w=384&q=75",
      registrationStatus: "Open",
    },
    {
      title: "Cliff Hanger Heavyweight",
      category: ["Youth (U14)", "Youth (U19)"],
      image:
        "https://events.avisengine.com/_next/image?url=https%3A%2F%2Fapi.avisengine.com%2Fassets%2F18dbf7a9-bd4d-44ea-9cd6-8f70c08aad83&w=384&q=75",
      registrationStatus: "Open",
    },
    {
      title: "Cliff Hanger Lightweight",
      category: ["Youth (U14)", "Youth (U19)"],
      image:
        "https://events.avisengine.com/_next/image?url=https%3A%2F%2Fapi.avisengine.com%2Fassets%2F18dbf7a9-bd4d-44ea-9cd6-8f70c08aad83&w=384&q=75",
      registrationStatus: "Open",
    },
  ],
  "FIRA Challenge": [
    {
      title: "Innovation & Creativity (Youth)",
      category: ["Youth (U14)", "Youth (U19)"],
      image:
        "https://events.avisengine.com/_next/image?url=https%3A%2F%2Fapi.avisengine.com%2Fassets%2F18dbf7a9-bd4d-44ea-9cd6-8f70c08aad83&w=384&q=75",
      registrationStatus: "Open",
    },
    {
      title: "Cliff Hanger Heavyweight",
      category: ["Youth (U14)", "Youth (U19)"],
      image:
        "https://events.avisengine.com/_next/image?url=https%3A%2F%2Fapi.avisengine.com%2Fassets%2F18dbf7a9-bd4d-44ea-9cd6-8f70c08aad83&w=384&q=75",
      registrationStatus: "Open",
    },
    {
      title: "Cliff Hanger Lightweight",
      category: ["Youth (U14)", "Youth (U19)"],
      image:
        "https://events.avisengine.com/_next/image?url=https%3A%2F%2Fapi.avisengine.com%2Fassets%2F18dbf7a9-bd4d-44ea-9cd6-8f70c08aad83&w=384&q=75",
      registrationStatus: "Open",
    },
  ],
  "FIRA Air": [
    {
      title: "Innovation & Creativity (Youth)",
      category: ["Youth (U14)", "Youth (U19)"],
      image:
        "https://events.avisengine.com/_next/image?url=https%3A%2F%2Fapi.avisengine.com%2Fassets%2F18dbf7a9-bd4d-44ea-9cd6-8f70c08aad83&w=384&q=75",
      registrationStatus: "Open",
    },
    {
      title: "Cliff Hanger Heavyweight",
      category: ["Youth (U14)", "Youth (U19)"],
      image:
        "https://events.avisengine.com/_next/image?url=https%3A%2F%2Fapi.avisengine.com%2Fassets%2F18dbf7a9-bd4d-44ea-9cd6-8f70c08aad83&w=384&q=75",
      registrationStatus: "Open",
    },
    {
      title: "Cliff Hanger Lightweight",
      category: ["Youth (U14)", "Youth (U19)"],
      image:
        "https://events.avisengine.com/_next/image?url=https%3A%2F%2Fapi.avisengine.com%2Fassets%2F18dbf7a9-bd4d-44ea-9cd6-8f70c08aad83&w=384&q=75",
      registrationStatus: "Open",
    },
  ],
};

export async function GET() {
  return NextResponse.json(leagues);
}
