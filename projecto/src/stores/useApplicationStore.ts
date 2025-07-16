import { create } from "zustand";

import { useLocalStorageStore } from "./useLocalStorage";

type ThemeValues = "light";

interface ApplicationStore {
    _applicationStateReady: boolean;

    currentTheme: ThemeValues;
    setTheme: (theme: ThemeValues) => void;
    cycleTheme: () => void;
    _loadTheme: () => void;

    recentTrackIds: string[];
    addRecentTrack: (trackId: string) => void;
    _loadRecentTrackIds: () => void;


    //


    // run `_load` functions;
    loadApplicationState: () => void;
}

const PRAM = {
    themes: ["light"] as ThemeValues[],

    lsKeys: {
        theme: "WOOF__MIKO__APPLICATIONSTATE__APPLICATION_THEME",
        recentTracks: "WOOF__MIKO__APPLICATIONSTATE__RECENT_TRACKS",
    }
};

export const useApplicationStore = create<ApplicationStore>((set, get) => ({
    _applicationStateReady: false,

    currentTheme: "light",
    setTheme: (theme) => {
        set({ currentTheme: theme });
        useLocalStorageStore.getState().set(PRAM.lsKeys.theme, theme);
    },
    cycleTheme: () => {
        const { currentTheme } = get();
        const themes = PRAM.themes;
        const currentIndex = themes.indexOf(currentTheme);
        const nextIndex = (currentIndex + 1) % themes.length;
        set({ currentTheme: themes[nextIndex] });
    },
    _loadTheme: () => {
        const theme = useLocalStorageStore.getState().get(PRAM.lsKeys.theme) as ThemeValues | null || "light";
        set({ currentTheme: theme });
    },

    recentTrackIds: [],
    addRecentTrack: (trackId) => {
        const { recentTrackIds } = get();
        if (recentTrackIds.includes(trackId)) return;

        const updated = [trackId, ...recentTrackIds.filter(id => id !== trackId)].slice(0, 4);
        useLocalStorageStore.getState().set(PRAM.lsKeys.recentTracks, JSON.stringify(updated));

        set({ recentTrackIds: updated });
    },
    _loadRecentTrackIds: () => {
        const data = useLocalStorageStore.getState().get(PRAM.lsKeys.recentTracks);
        if (!data) return;
        try {
            const parsed = JSON.parse(data);
            if (Array.isArray(parsed)) {
                set({ recentTrackIds: parsed.slice(0, 4) });
            }
        } catch(err) {
            console.error("Failed to parse recents from localStorage", err);
        }
    },


    //


    //
    loadApplicationState: () => {
        const state = get();

        state._loadRecentTrackIds();
    },
}));
