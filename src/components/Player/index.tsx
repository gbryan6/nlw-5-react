import Image from "next/image";
import { useRef, useEffect } from "react";
import { usePlayer } from "../../contexts/PlayerContext";
import Slider from "rc-slider";

import "rc-slider/assets/index.css";

import styles from "./styles.module.scss";

const Player: React.FC = () => {

  const audioRef = useRef<HTMLAudioElement>(null)

  const { 
    episodeList, 
    currentEpisodeIndex, 
    isPlaying, 
    togglePlay,
    setPlayingState,
    playNext,
    playPrevious,
    hasNext,
    isLooping,
    toggleLoop,
    hasPrevious
  } = usePlayer();

  useEffect(() => {
    if(!audioRef.current){
      return
    }

    if(isPlaying){
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying])

  const episode = episodeList[currentEpisodeIndex];

  return (
    <div className={styles.playerContainer}>
      <header>
        <img src="/playing.svg" alt="Tocando agora" />
        <strong>Tocando agora</strong>
      </header>

      {episode ? (
        <div className={styles.currentEpisode}>
          <Image
            width={592}
            height={592}
            src={episode.thumbnail}
            objectFit="cover"
          />
          <strong>{episode.title}</strong>
          <span>{episode.members}</span>
        </div>
      ) : (
        <div className={styles.emptyPlayer}>
          <strong>Selecione um podcast para ouvir</strong>
        </div>
      )}

      <footer className={!episode ? styles.empty : ""}>
        <div className={styles.progress}>
          <span>00:00</span>
          <div className={styles.slider}>
            {episode ? 
            <Slider 
            trackStyle={{ backgroundColor: '#04d361' }} 
            railStyle={{ backgroundColor: '#9f75ff' }}
            handleStyle={{ borderColor:'#04d361', borderWidth: 3 }}
            /> 
            : <div className={styles.emptySlider} />}
          </div>
          <span>00:00</span>
        </div>
            
        {
          episode && (
            <audio 
              ref={audioRef}
              src={episode.url}
              autoPlay
              loop={isLooping}
              onPlay={() => setPlayingState(true)}
              onPause={() => setPlayingState(false)}
            />
          )
        }

        <div className={styles.buttons}>
          <button type="button" disabled={!episode}>
            <img src="/shuffle.svg" alt="Embaralhar" />
          </button>
          <button type="button" disabled={!episode || !hasPrevious} onClick={() => playPrevious()}>
            <img src="/play-previous.svg" alt="Tocar anterior" />
          </button>
          <button type="button" className={styles.playButton} onClick={togglePlay} disabled={!episode}>
            {
              isPlaying 
              ? <img src="/pause.svg" alt="Tocar" />
              : <img src="/play.svg" alt="Tocar" />

            }
          </button>
          <button type="button" disabled={!episode || !hasNext} onClick={() => playNext()}>
            <img src="/play-next.svg" alt="Tocar proxima" />
          </button>
          <button 
          type="button" 
          disabled={!episode}
          onClick={() => toggleLoop()}
          className={ isLooping ? styles.isActive : ''}
          >
            <img src="/repeat.svg" alt="Repetir" />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Player;
