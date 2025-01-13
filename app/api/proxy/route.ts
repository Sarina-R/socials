// import { NextRequest } from "next/server";

// export async function GET(req: NextRequest) {
//   try {
//     const response = await fetch(
//       "https://rss.app/feeds/v1.1/JMworoRtNfxVrUth.json",
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     const data = await response.json();
//     return new Response(JSON.stringify(data), {
//       status: response.status,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   } catch (error) {
//     console.error("Proxy Error:", error);
//     return new Response(
//       JSON.stringify({ error: "Something went wrong in the proxy" }),
//       {
//         status: 500,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//   }
// }

// import { NextResponse } from "next/server";
// import axios from "axios";

// export async function GET(request: Request) {
//   try {
//     const iframeUrl = "https://rss.app/embed/v1/feed/JMworoRtNfxVrUth";
//     const { data } = await axios.get(iframeUrl);

//     const modifiedData = data.replace(
//       "</head>",
//       `<style>
//          .card-img {
//              aspect-ratio: 1 / 1;
//              object-fit: cover;
//          }
//        </style></head>`
//     );

//     return new NextResponse(modifiedData, {
//       headers: { "Content-Type": "text/html" },
//     });
//   } catch (error) {
//     console.error("Error fetching iframe content:", error);
//     return new NextResponse("Failed to fetch iframe content.", { status: 500 });
//   }
// }
