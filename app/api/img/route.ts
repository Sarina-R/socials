import { NextResponse } from "next/server";

const img = [
  {
    id: 1,
    link: "https://img1.wikia.nocookie.net/__cb20130127101401/spongebob/images/f/fe/To_Love_a_Patty_15.png",
  },
  {
    id: 2,
    link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPv9fZLFYqqwAq0IMS9bUKhGFonkZUjrhYgg&s",
  },
  {
    id: 3,
    link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjFlZMQrC371-tjO-xaYwSqFamg23QXrxOlw&s",
  },
  {
    id: 4,
    link: "https://i.pinimg.com/736x/bf/52/4c/bf524c6e1fdde55fcc70630c0f1d594a.jpg",
  },
];

export async function GET() {
  return NextResponse.json(img);
}
