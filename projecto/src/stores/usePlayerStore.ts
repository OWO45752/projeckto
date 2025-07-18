import type { Track } from "@miko/types";
import { create } from "zustand";
import { useContentStore } from "./useContentStore";
import { useApplicationStore } from "./useApplicationStore";

type RepeatMode = "off" | "one" | "all";

interface PlayerStore {
    currentTrack: Track | null;
    queue: string[];
    isPlaying: boolean;
    volume: number; // 0 to 1
    isShuffle: boolean;
    repeatMode: RepeatMode;
    currentTime: number; // Time in Millisec

    play: () => void;
    pause: () => void;
    togglePlay: () => void;
    setCurrentTrack: (trackId: string) => void;
    unplay: () => void;
    setCurrentTime: (t: number) => void;


    setQueue: (trackIds: string[]) => void;
    addTrackToQueue: (trackId: string) => void;
    removeTrackFromQueue: (trackId: string) => void;

    next: () => void;
    autoNext: () => void;
    prev: () => void;

    setVolume: (value: number) => void;

    shuffle: () => void;
    toggleShuffle: () => void;

    cycleRepeatMode: () => void;

    audioLoaded: boolean;
    setAudioLoaded: (v: boolean) => void;

    audioSeekTimeValue: number | null;
    setAudioSeekTimeValue: (v: number | null) => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
    currentTrack: null,
    queue: [],
    isPlaying: false,
    volume: 1,
    isShuffle: false,
    repeatMode: "all",
    currentTime: 0,

    play: () => {
        if (get().currentTrack === null) return;
        set((s) => {
            if (s.currentTrack?.duration_ms === s.currentTime) return { isPlaying: true, currentTime: 0 };
            return { isPlaying: true };
        });
    },
    pause: () => set({ isPlaying: false }),
    togglePlay: () => {
        const state = get();
        if (state.isPlaying) {
            state.pause();
        } else {
            state.play();
        }
    },

    setCurrentTrack: (trackId: string) => {
        const state = get();

        if (trackId === state.currentTrack?.id) return;

        if (!state.queue.includes(trackId)) {
            get().addTrackToQueue(trackId);
        }

        const track = useContentStore.getState().getTrack(trackId);
        if (track) {
            get().setAudioLoaded(false);
            set({ currentTrack: track, currentTime: 0 });
            useApplicationStore.getState().addRecentTrack(trackId);
        }
    },

    unplay: () => set({ currentTrack: null, isPlaying: false, currentTime: 0 }),

    setCurrentTime: (t) => set({ currentTime: t }),

    setQueue: (trackIds: string[]) => {
        if (trackIds.length === 0) return;
        set({ queue: trackIds });
        get().setCurrentTrack(trackIds[0]);
    },
    addTrackToQueue: (trackId) => {
        if (get().queue.includes(trackId)) return;
        set((s) => ({ queue: [...s.queue, trackId] }));
    },
    removeTrackFromQueue: (trackId) => {
        const state = get();
        const newQueue = state.queue.filter((id) => id !== trackId);

        const isCurrent = state.currentTrack?.id === trackId;

        // If the current track is being removed
        if (isCurrent) {
            if (newQueue.length > 0) {
                // Pick next track, or first if current was last
                const currentIndex = state.queue.indexOf(trackId);
                const nextIndex = Math.min(currentIndex, newQueue.length - 1);
                const nextTrackId = newQueue[nextIndex];
                get().setCurrentTrack(nextTrackId);
            } else {
                // No tracks left
                get().unplay();
                set({ queue: [] });
                return;
            }
        }

        // Just update queue if not current track
        set({ queue: newQueue });
    },


    next: () => {
        const { currentTrack, queue, repeatMode } = get();
        if (queue.length === 0 || !currentTrack) return;

        if (repeatMode === "one") {
            return get().play();
        }

        const currentIndex = queue.indexOf(currentTrack.id);
        let nextIndex = currentIndex + 1;

        if (nextIndex >= queue.length) {
            if (repeatMode === "all") {
                nextIndex = 0; // Loop back to the first track
            } else {
                // repeatMode === "off", stop playing
                set({ isPlaying: false });
                return;
            }
        }

        const nextTrackId = queue[nextIndex];
        get().setCurrentTrack(nextTrackId);
    },

    autoNext: () => {
        const { queue, currentTrack, repeatMode, isShuffle } = get();
        if (!currentTrack || queue.length === 0) return;

        const isLastTrack = queue[queue.length - 1] === currentTrack.id;

        if (repeatMode === "off") {
            if (isLastTrack) {
                get().pause();
                return;
            }
            get().next();
            return;
        }

        if (repeatMode === "all" && isLastTrack) {
            if (isShuffle) {
                get().shuffle();
            }
            get().next();
            return;
        }

        get().next();
    },


    prev: () => {
        const { currentTrack, queue, currentTime } = get();
        if (queue.length === 0 || !currentTrack) return;

        // If we're more than 3 seconds into the track, restart current track
        if (currentTime > 3000 || queue.length === 1) {
            set({ audioSeekTimeValue: 0, currentTime: 0 });
            return;
        }

        const currentIndex = queue.indexOf(currentTrack.id);
        let prevIndex = currentIndex - 1;

        if (prevIndex < 0) {
            if (get().repeatMode === "all") {
                prevIndex = queue.length - 1; // Loop to the last track
            } else {
                // Go to beginning of current track
                set({ currentTime: 0 });
                return;
            }
        }

        const prevTrackId = queue[prevIndex];
        get().setCurrentTrack(prevTrackId);
    },

    setVolume: (value: number) => {
        const clampedValue = Math.max(0, Math.min(1, value));
        set({ volume: clampedValue });
    },

    shuffle: () => {
        const { queue, currentTrack } = get();
        if (queue.length <= 1) return;

        const shuffledQueue = [...queue];

        for (let i = shuffledQueue.length - 1; i > 0; i--) {
            // eslint-disable-next-line sonarjs/pseudo-random
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledQueue[i], shuffledQueue[j]] = [shuffledQueue[j], shuffledQueue[i]];
        }

        if (currentTrack) {
            const currentIndex = shuffledQueue.indexOf(currentTrack.id);
            if (currentIndex > 0) {
                shuffledQueue.splice(currentIndex, 1);
                shuffledQueue.unshift(currentTrack.id);
            }
        }

        set({ queue: shuffledQueue });
    },

    toggleShuffle: () => {
        const state = get();
        if (state.isShuffle) {
            set({ isShuffle: false });
        } else {
            set({ isShuffle: true });
            get().shuffle();
        }
    },

    cycleRepeatMode: () => {
        const { repeatMode } = get();
        const modes: RepeatMode[] = ["off", "one", "all"];
        const currentIndex = modes.indexOf(repeatMode);
        const nextIndex = (currentIndex + 1) % modes.length;
        set({ repeatMode: modes[nextIndex] });
    },


    audioLoaded: false,
    setAudioLoaded: (v: boolean) => {
        set({ audioLoaded: v });
    },


    audioSeekTimeValue: null,
    setAudioSeekTimeValue: (v: number | null) => {
        set({ audioSeekTimeValue: v });
    }
}));
