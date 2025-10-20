# 🎵 Goodvibes Music App

Goodvibes is a modern, responsive music streaming web application that integrates with the **Spotify API** to provide song previews, artist information, and playlists — all in a sleek, interactive interface.

---

## 🚀 Features

- 🎧 Play and preview songs using the Spotify API  
- 🔍 Search for artists, albums, and tracks  
- 📱 Responsive design for both desktop and mobile  
- 🎨 Modern and vibrant UI with smooth animations  
- 💾 Environment variable support via `.env` file  
- ⚡ Fast and lightweight — built with vanilla JS and CSS

---

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS, JavaScript (Vanilla)
- **API:** Spotify Web API
- **Build Tools:** Node.js & npm
- **Environment Management:** `.env` for API keys

---

## 📁 Project Structure

```
Goodvibes/
├── index.html              # Main HTML entry point
├── package.json            # Node.js configuration & scripts
├── src/
│   ├── index.js            # Main JavaScript logic
│   ├── style.css           # Styling and layout
├── public/
│   └── images/             # Assets and icons
├── .env                    # Environment variables (not committed)
└── .gitignore              # Git ignore rules
```

---

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/chegebrian/Goodvibes.git
   cd Goodvibes
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root folder with your Spotify credentials:
   ```bash
   CLIENT_ID=your_spotify_client_id
   CLIENT_SECRET=your_spotify_client_secret
   ```

4. **Run the app**
   ```bash
   npm run dev
   ```
  
---

## 🧠 Future Improvements

- Add user authentication (Spotify OAuth)
- Create custom playlists and favorites
- Implement audio visualizations
- Add dark/light theme toggle
- Improve search performance and caching

---

## 💬 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to fork this repo and submit a pull request.

---

## 📄 License

This project is licensed under the **MIT License** — see the LICENSE file for details.

---

**Developed with ❤️ by Brian Waithaka**