import React, { useEffect } from "react";

type Settings = {
  volume?: number;
  playbackRate?: number;
};

const useSound = (url: string, settings: Settings | undefined = {}) => {
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        audioRef.current = null;
    }, [url])

    useEffect(() => {
        if (!audioRef.current) return;
        audioRef.current.volume = settings.volume || 1;
        audioRef.current.playbackRate = settings.playbackRate || 1;
    }, [settings])

    const play = () => {
        if (typeof window === "undefined") return;
        if (!audioRef.current) {
            audioRef.current = new Audio(url);
        };
        try {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        } catch (error) {
            console.error(error);
        }
        
    }

  return [play];
};

export default useSound;
