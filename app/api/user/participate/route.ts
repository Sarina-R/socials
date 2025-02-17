import { NextResponse } from "next/server";

const participate = {
  attended_events: [
    {
      event_id: 101,
      event_name: "National Robotics Championship",
      event_date: "2024-06-15",
      location: "Tech Arena, California",
      description:
        "A national-level robotics competition featuring AI-powered autonomous bots.",
      participation_type: "Competitor",
      team_name: "AI Warriors",
      ranking: "2nd Place",
    },
    {
      event_id: 102,
      event_name: "AI & Robotics Expo",
      event_date: "2024-08-21",
      location: "Innovation Hub, New York",
      description:
        "An exhibition showcasing the latest advancements in robotics and AI.",
      participation_type: "Speaker",
      session_topic: "The Future of AI in Robotics",
      organization: "NextGen AI",
    },
    {
      event_id: 103,
      event_name: "RoboCombat League",
      event_date: "2024-09-10",
      location: "Tech City, Texas",
      description:
        "A battle arena where teams pit their custom-built combat robots against each other.",
      participation_type: "Mentor",
      team_mentored: "Cyber Titans",
      result: "Quarter-Finals",
    },
  ],
};

export async function GET() {
  return NextResponse.json(participate);
}
