import axios from "axios";

export async function GET(request: Request) {
  const username = "Sarinar229859";
  const bearerToken = process.env.TWITTER_BEARER_TOKEN;

  try {
    console.log("Bearer Token:", bearerToken);

    const userIdResponse = await axios.get(
      `https://api.x.com/2/users/by/username/${username}`,
      {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      }
    );
    console.log("User ID Response:", userIdResponse.data);
    const userId = userIdResponse?.data?.data?.id;

    if (!userId) {
      throw new Error("User ID not found");
    }

    const tweetsResponse = await axios.get(
      `https://api.twitter.com/2/users/${userId}/tweets`,
      {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
        params: {
          max_results: 10,
          "tweet.fields": "created_at",
        },
      }
    );
    console.log("Tweets Response:", tweetsResponse.data);

    return new Response(JSON.stringify(tweetsResponse.data), {
      status: 200,
    });
  } catch (error: any) {
    console.error(
      "Error fetching userId or tweets:",
      error.response?.data || error.message
    );

    return new Response(
      JSON.stringify({
        error: error.response?.data || error.message,
      }),
      { status: 500 }
    );
  }
}
