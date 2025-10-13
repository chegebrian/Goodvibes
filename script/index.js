require("dotenv").config();

const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const tokenEndpointUrl = "https://accounts.spotify.com/api/token";
const artistEndpointUrl = "https://api.spotify.com/v1/artists";
const searchEndpointUrl = "https://api.spotify.com/v1/search";

// const id = 5HmoSRJDslP21IjvUSWZKx

async function fetchAccessToken() {
  try {
    const response = await fetch(tokenEndpointUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: clientID,
        client_secret: clientSecret,
      }),
    });

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error(error);
  }
}

async function fetchArtistId() {
  // const userInput = document.querySelector("#search").value;
  const userInput = "drake";
  const accessToken = await fetchAccessToken();
  try {
    const response = await fetch(
      `${searchEndpointUrl}?q=${encodeURIComponent(userInput)}&type=artist`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await response.json();
    console.log(data.artists.items[0]);
  } catch (error) {
    console.error(error);
  }
}

fetchArtistId();

async function fetchArtist() {
  const accessToken = await fetchAccessToken();

  try {
    const response = await fetch(
      `${artistEndpointUrl}/5HmoSRJDslP21IjvUSWZKx`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await response.json();
  } catch (error) {
    console.error(error);
  }
}
fetchArtist();
