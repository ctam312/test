# Spotify Swipe App

This sample app lets you sign in with Spotify and swipe through your saved tracks Tinder-style.

## Setup

1. In `server/`, set `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, and `REDIRECT_URI` environment variables. The recommended redirect URI is `http://127.0.0.1:8000/callback`.
2. Run `npm install` in both `server/` and `client/` if not already installed.
3. Build the client with `npm run build` in `client/`.
4. Start the server with `npm start` in `server/` (it listens on port 8000).

Then open `http://127.0.0.1:8000/login` to authenticate.
