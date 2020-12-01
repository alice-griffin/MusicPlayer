import React from 'react';

const LibrarySong = ({song, songs, setCurrentSong, id, audioRef, isPlaying, setSongs}) => {


    const songSelectHandler = () => {
        setCurrentSong(song);
        const setActiveStatus = songs.map((song) => {
            if (song.id === id) {
                return {...song, active: true}
            } else {
                return {...song, active: false}
            }
        })
        setSongs(setActiveStatus)
        if (isPlaying) {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.then((audio) => {
                    audioRef.current.play(); 
                })
            }
        }  
    }
    
    return (
        <div onClick={songSelectHandler} className={`LibrarySong ${song.active ? 'selected' : ''}`}>
            <img src={song.cover}/>
            <div className="song-desc">
            <h3>{song.name}</h3>
            <h4>{song.artist}</h4>
            </div>
        </div>
    )
}

export default LibrarySong; 