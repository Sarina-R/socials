import { NextResponse } from "next/server";

const img = [
  {
    id: 1,
    link: "https://tribe-s3-production.imgix.net/T6dtBCk2tw6HnB4u5QLdP?fit=max&w=1000&auto=compress",
  },
  {
    id: 2,
    link: "https://tribe-s3-production.imgix.net/T6dtBCk2tw6HnB4u5QLdP?fit=max&w=1000&auto=compress",
  },
  {
    id: 3,
    link: "https://tribe-s3-production.imgix.net/T6dtBCk2tw6HnB4u5QLdP?fit=max&w=1000&auto=compress",
  },
  {
    id: 4,
    link: "https://tribe-s3-production.imgix.net/T6dtBCk2tw6HnB4u5QLdP?fit=max&w=1000&auto=compress",
  },
];

export async function GET() {
  return NextResponse.json(img);
}
