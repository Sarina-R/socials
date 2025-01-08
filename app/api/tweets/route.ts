import axios from "axios";

export async function GET(request: Request) {
  const username = "elonmusk";
  const bearerToken = process.env.TWITTER_BEARER_TOKEN;

  try {
    // Log the token for debugging
    console.log("Bearer Token:", bearerToken);

    // Fetch user ID from Twitter API
    const userIdResponse = await axios.get(
      `https://api.twitter.com/2/users/by/username/${username}`,
      {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      }
    );
    console.log("User ID Response:", userIdResponse.data); // Debugging the response
    const userId = userIdResponse?.data?.data?.id;

    if (!userId) {
      throw new Error("User ID not found");
    }

    // Fetch tweets for the user
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
    console.log("Tweets Response:", tweetsResponse.data); // Debugging the response

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
