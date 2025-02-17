import { NextResponse } from "next/server";

const award = {
  achievements: [
    {
      award_id: 201,
      title: "Best AI-Driven Robot",
      event_name: "National Robotics Championship",
      event_date: "2024-06-15",
      category: "Innovation",
      description:
        "Awarded for developing an autonomous robot with advanced AI capabilities.",
    },
    {
      award_id: 202,
      title: "Community Leader Award",
      community_name: "Global Robotics Forum",
      year: "2024",
      category: "Leadership",
      description:
        "Recognized for contributions in organizing workshops and mentoring young engineers.",
    },
    {
      award_id: 203,
      title: "First Place - Autonomous Drone Challenge",
      event_name: "Tech Innovators Expo",
      event_date: "2024-05-12",
      category: "Autonomous Systems",
      description:
        "Secured first place in a challenge to develop an autonomous drone for delivery services.",
    },
  ],
};

export async function GET() {
  return NextResponse.json(award);
}
