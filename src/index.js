const clientID = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
const tokenEndpointUrl = "https://accounts.spotify.com/api/token";
const artistEndpointUrl = "https://api.spotify.com/v1/artists";
const searchEndpointUrl = "https://api.spotify.com/v1/search";
const trackEndpointUrl = "https://api.spotify.com/v1/tracks";

const formEl = document.querySelector("form");
const artistsSectionEl = document.querySelector("#artists-section");
const songsSectionEl = document.querySelector("#songs-section");

const formatter = new Intl.NumberFormat("en-US");

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
      `${searchEndpointUrl}?q=${encodeURIComponent(
        userInput
      )}&type=artist,track`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const artist = await response.json();
    console.log(artist);
    displayArtist(artist.artists.items);
  } catch (error) {
    console.error(error);
  }
}

formEl.addEventListener("submit", async (e) => {
  e.preventDefault();
  let userInput = e.target.search.value;
  console.log(userInput);

  await fetchArtist(userInput);
});

async function displayArtist(artists) {
  console.log(artists);

  try {
    const arrayofArtists = artists
      .map(
        (artist) => `
      <div class="artist-card" data-id="${artist.id}">
      <img src=${artist.images[0]?.url} alt=${artist.name} width="160px">
      <div>
        <span></span>
        <h3>${artist.name}</h3>
        <p>${formatter.format(artist.followers.total)} monthly listeners</p>
            <ul>
   ${artist.genres.map((genre) => `<li>${genre}</li>`).join("")}
    </ul>
      </div>
    </div>
  `
      )
      .join("");

    artistsSectionEl.innerHTML = arrayofArtists;

    document.querySelectorAll(".artist-card").forEach((artistCard) =>
      artistCard.addEventListener("click", () => {
        fetchSpecificArtist(artistCard.dataset.id);
      })
    );
  } catch (error) {
    console.error(error);
  }
}

async function fetchSpecificArtist(id) {
  const accessToken = await fetchAccessToken();
  try {
    const response = await fetch(`${artistEndpointUrl}/${id}/top-tracks`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    displayArtistSongs(data.tracks);
  } catch (error) {
    console.error(error);
  }
}

async function displayArtistSongs(songs) {
  console.log(songs);
  const topTracks = songs
    .map(
      (song) => `
<div>
<h3>${song.name}</h3>
<span>${song.artists.map((artist) => artist.name).join(", ")}</span>
</div>

`
    )
    .join("");

  songsSectionEl.innerHTML = topTracks;
}

// spotify iframe Api

// This signals to your app that it is now safe to rely on the methods of the iFrame API.
window.onSpotifyIframeApiReady = (IFrameAPI) => {
  //
};

