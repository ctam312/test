# Spotify Swipe App

This sample app lets you sign in with Spotify and swipe through your saved tracks Tinder-style.

## Setup

1. Use **Node.js 18** or later. Earlier versions lack the `crypto.getRandomValues`
   API used by Vite during the build process.
2. In `server/`, create a `.env` file containing `SPOTIFY_CLIENT_ID`,
   `SPOTIFY_CLIENT_SECRET`, and `REDIRECT_URI`. The recommended redirect URI is
   `http://127.0.0.1:8000/callback`. These values are loaded from the
   environment so your secrets stay private.
3. Run `npm install` in both `server/` and `client/` if not already installed.
4. Build the client with `npm run build` in `client/`.
5. Start the server with `npm start` in `server/` (it listens on port 8000).

Then open `http://127.0.0.1:8000/login` to authenticate.
