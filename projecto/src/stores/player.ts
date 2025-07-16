import type { Track } from "@miko/types";
import { create } from "zustand";

interface PlayerStore {
    currentTrack: Track | null;
    queue: Track[];
    isPlaying: boolean;
    volume: number; // 0 to 1
    isShuffle: boolean;
    repeatMode: "off" | "one" | "all";

    play: () => void
    pause: () => void
    togglePlay: () => void
    addTrackToQueue: (track: Track) => void;
    setTrack: (track: Track) => void
    setQueue: (tracks: Track[]) => void
    next: () => void
    prev: () => void
    setVolume: (value: number) => void
    toggleShuffle: () => void
    cycleRepeatMode: () => void
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
    
}));
