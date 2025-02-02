import { NextResponse } from "next/server";

const admins = [
  {
    id: 1,
    name: "Alice Johnson",
    description: "Senior Developer with expertise in frontend technologies.",
    monthOfJoin: "January 2022",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLXU3Sxn8X1sdn2wuTi16y_jFiX6ZjOfa_WQ&s",
    position: "Senior Developer",
  },
  {
    id: 2,
    name: "Bob Smith",
    description: "Project Manager overseeing multiple teams.",
    monthOfJoin: "March 2021",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLXU3Sxn8X1sdn2wuTi16y_jFiX6ZjOfa_WQ&s",
    position: "Project Manager",
  },
  {
    id: 3,
    name: "Charlie Lee",
    description: "HR specialist managing company culture and hiring.",
    monthOfJoin: "June 2020",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLXU3Sxn8X1sdn2wuTi16y_jFiX6ZjOfa_WQ&s",
    position: "HR Manager",
  },
  {
    id: 4,
    name: "Diana Ross",
    description: "Lead UX/UI designer shaping user experiences.",
    monthOfJoin: "September 2019",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLXU3Sxn8X1sdn2wuTi16y_jFiX6ZjOfa_WQ&s",
    position: "Lead Designer",
  },
  {
    id: 5,
    name: "Ethan Clark",
    description: "DevOps engineer optimizing infrastructure and CI/CD.",
    monthOfJoin: "December 2018",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLXU3Sxn8X1sdn2wuTi16y_jFiX6ZjOfa_WQ&s",
    position: "DevOps Engineer",
  },
];

export async function GET() {
  return NextResponse.json(admins);
}
