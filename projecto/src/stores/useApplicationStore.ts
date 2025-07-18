import { create } from "zustand";

import { useLocalStorageStore } from "./useLocalStorage";

// eslint-disable-next-line sonarjs/redundant-type-aliases
type ThemeValues = string;

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
    isReady: boolean;
}

const PRAM = {
    themes: ["light", "dark", "monokai-pro"] as ThemeValues[],

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
        document.body.setAttribute("theme", theme);
    },
    cycleTheme: () => {
        const { currentTheme } = get();
        const themes = PRAM.themes;
        const currentIndex = themes.indexOf(currentTheme);
        const nextIndex = (currentIndex + 1) % themes.length;

        get().setTheme(themes[nextIndex]);
    },
    _loadTheme: () => {
        const theme = (useLocalStorageStore.getState().get(PRAM.lsKeys.theme) || "").trim() as ThemeValues;
        if (theme === "") return get().setTheme("light");
        get().setTheme(theme);
    },

    recentTrackIds: [],
    addRecentTrack: (trackId) => {
        const { recentTrackIds } = get();

        if (recentTrackIds.includes(trackId)) {
            const tindex = recentTrackIds.indexOf(trackId);
            recentTrackIds.splice(tindex, 1);
        }

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

        state._loadTheme();

        state._loadRecentTrackIds();

        set({ isReady: true });
    },
    isReady: false,
}));
