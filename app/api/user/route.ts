import { NextResponse } from "next/server";

const profile = {
  id: 101,
  name: "John Doe",
  headline: "Software Engineer at TechCorp",
  avatar: "https://esports.ch/wp-content/uploads/2024/11/jinx-arcane.jpg",
  location: "San Francisco, CA, USA",
  connections: 500,
  about:
    "Experienced software engineer with a passion for building scalable web applications and leading development teams.",
  experience: [
    {
      id: 1,
      position: "Senior Software Engineer",
      company: "TechCorp",
      company_logo:
        "https://static.wikia.nocookie.net/forgottenrealms/images/e/e7/4e_red_dragon.jpg/revision/latest?cb=20081013211322",
      start_date: "2021-05-01",
      end_date: null,
      description:
        "Leading a team of developers to build next-gen SaaS products.",
    },
    {
      id: 2,
      position: "Software Engineer",
      company: "StartupX",
      company_logo: "https://storage.googleapis.com/pod_public/750/200740.jpg",
      start_date: "2018-09-01",
      end_date: "2021-04-30",
      description:
        "Developed microservices for a fast-growing e-commerce platform.",
    },
  ],
  education: [
    {
      id: 1,
      degree: "B.Sc. in Computer Science",
      institution: "Stanford University",
      institution_logo:
        "https://i.pinimg.com/736x/50/ce/0f/50ce0f7d4b445a059614f548d229a683.jpg",
      start_date: "2014-08-01",
      end_date: "2018-06-30",
    },
  ],
  skills: ["JavaScript", "React", "Node.js", "TypeScript", "GraphQL"],
  projects: [
    {
      id: 1,
      title: "Open Source Dashboard",
      description: "Built an open-source analytics dashboard for developers.",
      url: "https://github.com/johndoe/dashboard",
    },
  ],
  contact: {
    email: "john.doe@email.com",
    phone: "+1 123-456-7890",
    website: "https://johndoe.dev",
    linkedin: "https://linkedin.com/in/johndoe",
    telegram: "https://t.me/johndoe",
    twitter: "https://twitter.com/johndoe",
    github: "https://github.com/johndoe",
  },
};

export async function GET() {
  return NextResponse.json(profile);
}
