import { NextResponse } from "next/server";

const admins = [
  {
    id: 1,
    name: "Alice Johnson",
    description: "Senior Developer with expertise in frontend technologies.",
    monthOfJoin: "January 2022",
    avatar:
      "https://i.etsystatic.com/34654177/r/il/22f3d1/4057574661/il_570xN.4057574661_iesx.jpg",
    position: "Senior Developer",
  },
  {
    id: 2,
    name: "Bob Smith",
    description: "Project Manager overseeing multiple teams.",
    monthOfJoin: "March 2021",
    avatar:
      "https://th.bing.com/th/id/OIP.-rGG2Iog2PZp6pksM4zdMwHaHa?rs=1&pid=ImgDetMain",
    position: "Project Manager",
  },
  {
    id: 3,
    name: "Charlie Lee",
    description: "HR specialist managing company culture and hiring.",
    monthOfJoin: "June 2020",
    avatar:
      "https://i.pinimg.com/736x/c7/3a/f0/c73af012e993e1a8c2a1402556564fb0.jpg",
    position: "HR Manager",
  },
  {
    id: 4,
    name: "Diana Ross",
    description: "Lead UX/UI designer shaping user experiences.",
    monthOfJoin: "September 2019",
    avatar:
      "https://th.bing.com/th/id/OIP.WYpY0R7t1ya5-PlyG26SUwAAAA?rs=1&pid=ImgDetMain",
    position: "Lead Designer",
  },
  {
    id: 5,
    name: "Ethan Clark",
    description: "DevOps engineer optimizing infrastructure and CI/CD.",
    monthOfJoin: "December 2018",
    avatar:
      "https://th.bing.com/th/id/OIP.gcXpcnc6NRj65N38lzcVQgHaHY?rs=1&pid=ImgDetMain",
    position: "DevOps Engineer",
  },
];

export async function GET() {
  return NextResponse.json(admins);
}
