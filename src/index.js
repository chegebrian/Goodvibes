const clientID = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
const tokenEndpointUrl = "https://accounts.spotify.com/api/token";
const artistEndpointUrl = "https://api.spotify.com/v1/artists";
const searchEndpointUrl = "https://api.spotify.com/v1/search";

const formEl = document.querySelector("form");
const sectionEl = document.querySelector("section");

const formatter = new Intl.NumberFormat("en-US");

// const id = 5HmoSRJDslP21IjvUSWZKx

// function to get our access token for authorization

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

async function fetchArtist(userInput) {
  // userInput = "nina simone";
  if (!userInput) return;
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
    const artist = await response.json();
    console.log(artist);
    displayArtist(artist.artists.items[0]);
  } catch (error) {
    console.error(error);
  }
}

// fetchArtistId();

formEl.addEventListener("submit", async (e) => {
  e.preventDefault();
  let userInput = e.target.search.value;
  console.log(userInput);

  await fetchArtist(userInput);
});

async function displayArtist(artist) {
  // const artist = await fetchArtist();
  console.log(artist);
  sectionEl.innerHTML = `
      <div>
      <img src=${artist.images[0].url} alt=${artist.name} width="320px">
      <div>
        <span></span>
        <h3>${artist.name}</h3>
        <p>${formatter.format(artist.followers.total)} monthly listeners</p>
            <ul>
   ${artist.genres.map((genre) => `<li>${genre}</li>`).join("")}
    </ul>
      </div>
    </div>
  `;
}
