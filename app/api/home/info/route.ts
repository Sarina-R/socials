import { NextResponse } from "next/server";

const info = {
  poster:
    "https://events.avisengine.com/_next/image?url=https%3A%2F%2Fapi.avisengine.com%2Fassets%2F335a471c-3df6-42f3-847f-a1b6cb084e6f&w=1080&q=75",
  important_dates: {
    "Technical Documents Submission": "2025-01-26 12:00 (Asia/Tehran)",
    "Early Registration": "2025-02-19 23:59 (Asia/Tehran)",
    "Regular Registration": "2025-03-01 23:59 (Asia/Tehran)",
    "Late Registration": "2025-03-10 23:59 (Asia/Tehran)",
  },
  about_event:
    "The National Robotics Committee of the Islamic Republic of Iran (FIRA) and the Iranian Robotics Association play an effective role in the fundamental advancement of the development and promotion goals of the sciences and skills required in the robotics, mechatronics, and artificial intelligence industry, annually The international robotics and artificial intelligence competitions (Iran FIRA Cup) will be held in different leagues in two categories, youth, and pro. All professors, researchers, students, and those interested in the fields of robotics, mechatronics, and artificial intelligence are invited to participate in this festival and help us in holding this conference magnificently and effectively, as well as presenting and exchanging information and scientific and Industrial achievements. The National Robotics Committee of the Islamic Republic of IranFIRA, The Robotics Society of Iran, and the FIRA World Robotics Federation (FIRA) wish success to all the participants of this competition. The first FIRA Programming competition in the two disciplines of ScratchBot and PyCraft will be held at this event.",
  country: {
    name: "Iran",
    flag_url: "https://flagcdn.com/w320/ir.png",
  },
  event_dates: {
    start: "2025-04-15",
    end: "2025-04-18",
  },
  city: "Tehran",
  event_type: "In-person",
  organizers: [
    {
      name: "FIRA",
      logo: "https://events.avisengine.com/_next/image?url=https%3A%2F%2Fapi.avisengine.com%2Fassets%2F5882f184-db34-44d7-93b3-944d274115a9&w=384&q=75",
    },
    {
      name: "Avis Engine",
      logo: "https://events.avisengine.com/_next/image?url=https%3A%2F%2Fapi.avisengine.com%2Fassets%2F95b53f64-b8fc-427b-8a9f-5f800da4e0c3&w=384&q=75",
    },
  ],
};

export async function GET() {
  return NextResponse.json(info);
}
