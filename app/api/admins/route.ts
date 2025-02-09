import { NextResponse } from "next/server";

const admins = [
  {
    id: 1,
    name: "Alice Johnson",
    description: "Senior Developer with expertise in frontend technologies.",
    monthOfJoin: "January 2022",
    avatar:
      "https://cdn.iframe.ly/api/thumbnail?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DqOHalJQH38k&key=29ae8f7432aadad5ca7c91b46030e818&maxwidth=960",
    position: "Senior Developer",
  },
  {
    id: 2,
    name: "Bob Smith",
    description: "Project Manager overseeing multiple teams.",
    monthOfJoin: "March 2021",
    avatar:
      "https://cdn.iframe.ly/api/thumbnail?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DqOHalJQH38k&key=29ae8f7432aadad5ca7c91b46030e818&maxwidth=960",
    position: "Project Manager",
  },
  {
    id: 3,
    name: "Charlie Lee",
    description:
      "HR specialist managing company culture and hiring.HR specialist managing company culture and hiring.HR specialist managing company culture and hiring.",
    monthOfJoin: "June 2020",
    avatar:
      "https://cdn.iframe.ly/api/thumbnail?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DqOHalJQH38k&key=29ae8f7432aadad5ca7c91b46030e818&maxwidth=960",
    position: "HR Manager",
  },
  {
    id: 4,
    name: "Diana Ross",
    description: "Lead UX/UI designer shaping user experiences.",
    monthOfJoin: "September 2019",
    avatar:
      "https://cdn.iframe.ly/api/thumbnail?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DqOHalJQH38k&key=29ae8f7432aadad5ca7c91b46030e818&maxwidth=960",
    position: "Lead Designer",
  },
  {
    id: 5,
    name: "Ethan Clark",
    description: "DevOps engineer optimizing infrastructure and CI/CD.",
    monthOfJoin: "December 2018",
    avatar:
      "https://cdn.iframe.ly/api/thumbnail?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DqOHalJQH38k&key=29ae8f7432aadad5ca7c91b46030e818&maxwidth=960",
    position: "DevOps Engineer",
  },
];

export async function GET() {
  return NextResponse.json(admins);
}
