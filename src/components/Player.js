import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faAngleLeft, faAngleRight, faPause } from '@fortawesome/free-solid-svg-icons';

const Player = ({ setSongs, currentSong, isPlaying, setIsPlaying, audioRef, songs, setCurrentSong }) => {

    const [songInfo, setSongInfo] = useState({ currentTime: 0, duration: 0 })

    useEffect(() => {
        const setActiveStatus = songs.map((song) => {
            if (song.id === currentSong.id) {
                return {...song, active: true}
            } else {
                return {...song, active: false}
            }
        })
        setSongs(setActiveStatus)
    }, [currentSong])

    const playSongHandler = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying)
        } else {
            audioRef.current.play();
            setIsPlaying(!isPlaying)
        }

    }

    const timeUpdateHandler = (e) => {
        const current = e.target.currentTime;
        const duration = e.target.duration;
        setSongInfo({ ...songInfo, currentTime: current, duration: duration });
    }

    const formatTime = (time) => {
        return (
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        )
    }

    const autoPlayHandler = () => {
        if (isPlaying) {
            audioRef.current.play();
        }
    }

    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({ ...songInfo, currentTime: e.target.value })
    }

    const skipTrackHandler = (direction) => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        let newIndex = currentIndex + direction

        if ( newIndex < 0 ) {
            newIndex = songs.length - 1;  
        } else if (newIndex >= songs.length) {
            newIndex = 0; 
        }
        setCurrentSong(songs[newIndex]); 
    }

    const songEndHandler = async () => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        await setCurrentSong(songs[(currentIndex + 1) % songs.length]); 
    }

    return (
        <div className="Player">
            <div className="time-control">
                <p>{formatTime(songInfo.currentTime)}</p>
                <input onChange={dragHandler} min={0} max={songInfo.duration} value={songInfo.currentTime} type='range' />
                <p>{formatTime(songInfo.duration || 0)}</p>
            </div>

            <div className="play-control">
                <FontAwesomeIcon onClick={() => skipTrackHandler(-1)} className="skip-back" size="2x" icon={faAngleLeft} />
                <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={songInfo.currentTime === 0 || isPlaying ? faPlay : faPause} />
                <FontAwesomeIcon onClick={() => skipTrackHandler(1)} className="skip-forward" size="2x" icon={faAngleRight} />
            </div>
            <audio onEnded={songEndHandler} onLoadedData={autoPlayHandler} onLoadedMetadata={timeUpdateHandler} onTimeUpdate={timeUpdateHandler} ref={audioRef} src={currentSong.audio}></audio>
        </div>
    )
}

export default Player; 