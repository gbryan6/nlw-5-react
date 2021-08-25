import { createContext, ReactNode, useState } from "react";

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
};

type PlayerContextData = {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  play: (episode: Episode) => void;
  playList: (list: Episode[], index: number) => void;
  setPlayingState: (state: boolean) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrevious: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
};

type PlayerContextProviderProps = {
    children: ReactNode;
}

export const playerContext = createContext({} as PlayerContextData);

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  function play(episode: Episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function playList(list: Episode[], index: number){
      setEpisodeList(list)
      setCurrentEpisodeIndex(index)
      setIsPlaying(true)
  }

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  const hasPrevious = currentEpisodeIndex > 0;
  const hasNext = (currentEpisodeIndex + 1) < episodeList.length

  function playNext(){
      if(hasNext){
        setCurrentEpisodeIndex(currentEpisodeIndex + 1);
      }
      
  }
  function playPrevious(){
      if(hasPrevious){
        setCurrentEpisodeIndex(currentEpisodeIndex - 1);
      }
      
  }

  return (
    <playerContext.Provider
      value={{
        episodeList,
        currentEpisodeIndex,
        play,
        isPlaying,
        playList,
        togglePlay,
        playNext,
        playPrevious,
        setPlayingState,
        hasNext,
        hasPrevious
      }}
    >
      {children}
    </playerContext.Provider>
  );
}