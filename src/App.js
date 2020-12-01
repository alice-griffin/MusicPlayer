import React, { useState, useRef } from "react";

import './styles/App.scss';
import Player from './components/Player';
import Song from './components/Song';
import data from './data';
import Library from './components/Library';
import Nav from './components/Nav';

function App() {

  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [libraryStatus, setLibraryStatus] = useState(false);

    return (
    <div className={`App ${libraryStatus ? 'library-active' : ''}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song isPlaying={isPlaying} setIsPlaying={setIsPlaying} currentSong={currentSong} />
      <Player setSongs={setSongs} setCurrentSong={setCurrentSong} songs={songs} isPlaying={isPlaying} setIsPlaying={setIsPlaying} currentSong={currentSong} audioRef={audioRef} />
      <Library libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} setSongs={setSongs} songs={songs} setCurrentSong={setCurrentSong} audioRef={audioRef} isPlaying={isPlaying} />
    </div>
  );
}

export default App;
