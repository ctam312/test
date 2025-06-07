import "./style.css";
import { useEffect, useState } from 'react';
import TinderCard from 'react-tinder-card';

interface Track {
  id: string;
  name: string;
  artist: string;
  albumArt: string;
  previewUrl: string;
  genres: string[];
}

export default function App() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [likedGenres, setLikedGenres] = useState<string[]>([]);

  useEffect(() => {
    fetch('/api/tracks')
      .then(res => res.json())
      .then(data => setTracks(data));
  }, []);

  const swiped = (dir: string, track: Track) => {
    if (dir === 'right') {
      setLikedGenres(prev => Array.from(new Set([...prev, ...track.genres])));
    }
  };

  const outOfFrame = (name: string) => {
    // placeholder
  };

  return (
    <div className="app">
      <h1>Spotify Swipe</h1>
      <div className="cardContainer">
        {tracks.map(track => (
          <TinderCard
            className="swipe"
            key={track.id}
            onSwipe={dir => swiped(dir, track)}
            onCardLeftScreen={() => outOfFrame(track.name)}
          >
            <div className="card">
              <img src={track.albumArt} alt={track.name} />
              <h3>{track.name} - {track.artist}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
      <button onClick={() => alert('Liked genres: ' + likedGenres.join(', '))}>Done</button>
    </div>
  );
}
