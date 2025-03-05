import { ApiResponse } from "@/app/(dynamicPage)/home3/type";
import axios from "axios";
import { serialize } from "next-mdx-remote/serialize";
import { API_URLS } from "../url";

export async function GET() {
  const rawData: ApiResponse = await axios.get(API_URLS.DYNAMIC_PAGE);

  const sections = await Promise.all(
    rawData.sections.map(async (section) => {
      if (section.type === "hero") {
        return {
          ...section,
          title: await serialize(section.title),
          description: await serialize(section.description),
        };
      }
      return section;
    })
  );

  return Response.json({ ...rawData, sections });
}
