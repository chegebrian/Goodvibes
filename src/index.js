const clientID = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
const tokenEndpointUrl = "https://accounts.spotify.com/api/token";
const artistEndpointUrl = "https://api.spotify.com/v1/artists";
const searchEndpointUrl = "https://api.spotify.com/v1/search";
const formEl = document.querySelector("form");

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

async function fetchArtistId(userInput) {
  const accessToken = await fetchAccessToken();
  try {
    const response = await fetch(
      `${searchEndpointUrl}?q=${encodeURIComponent(
        userInput
      )}&type=artist,album,track,playlist,`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// fetchArtistId();

formEl.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userInput = e.target.search.value;
  // console.log(userInput);

  await fetchArtistId(userInput);
});

// async function fetchArtist() {
//   const accessToken = await fetchAccessToken();

//   try {
//     const response = await fetch(
//       `${artistEndpointUrl}/5HmoSRJDslP21IjvUSWZKx`,
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       }
//     );
//     const data = await response.json();
//     console.log(data);
//   } catch (error) {
//     console.error(error);
//   }
// }
// fetchArtist();
