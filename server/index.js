const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();
app.use(cookieParser());
app.use(cors());

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || 'YOUR_CLIENT_ID';
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || 'YOUR_CLIENT_SECRET';
const REDIRECT_URI =
  process.env.REDIRECT_URI || 'http://127.0.0.1:8000/callback';

const spotifyApi = new SpotifyWebApi({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  redirectUri: REDIRECT_URI,
});

app.get('/login', (req, res) => {
  const scopes = ['user-library-read'];
  const authorizeURL = spotifyApi.createAuthorizeURL(scopes, 'state');
  res.redirect(authorizeURL);
});

app.get('/callback', async (req, res) => {
  const { code } = req.query;
  try {
    const data = await spotifyApi.authorizationCodeGrant(code);
    spotifyApi.setAccessToken(data.body['access_token']);
    spotifyApi.setRefreshToken(data.body['refresh_token']);
    res.redirect('/');
  } catch (err) {
    res.status(400).send('Error in authentication');
  }
});

app.get('/api/tracks', async (req, res) => {
  try {
    const data = await spotifyApi.getMySavedTracks({ limit: 20 });
    const tracks = await Promise.all(
      data.body.items.map(async (item) => {
        const track = item.track;
        const preview = track.preview_url;
        const genresData = await spotifyApi.getArtist(track.artists[0].id);
        return {
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          albumArt: track.album.images[0].url,
          previewUrl: preview,
          genres: genresData.body.genres,
        };
      })
    );
    res.json(tracks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use(express.static('../client/dist'));

app.listen(8000, () => {
  console.log('Server listening on http://127.0.0.1:8000');
});
