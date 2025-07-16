import type { Album, Artist, IFApiResponse, Track } from "@miko/types";
import { create } from "zustand";

interface ContentStore {
    getTrack: (id: string) => Track | null;
    getArtist: (id: string) => Artist | null;
    getAlbum: (id: string) => Album | null;

    data: IFApiResponse | null;
    FVX_SET_DATA: (data: IFApiResponse) => void;

    getFeaturedTracks: () => Track[] | null;
    getDiscoverTracks: () => Track[] | null;
}

export const useContentStore = create<ContentStore>((set, get) => ({
    data: null,
    FVX_SET_DATA: (data) => set({ data }),

    getTrack: (id) => {
        const data = get().data;
        if (data === null) return null;

        return data.tracks[id] || null;
    },

    getArtist: (id) => {
        const data = get().data;
        if (data === null) return null;

        return data.artists[id] || null;
    },

    getAlbum: (id) => {
        const data = get().data;
        if (data === null) return null;

        return data.albums[id] || null;
    },

    getFeaturedTracks: () => {
        const gdata = get();
        if (gdata.data === null) return null;

        const tracks = [];
        for (const tid of gdata.data.v_featured) {
            const track = gdata.getTrack(tid);
            if (!track) continue;
            tracks.push(track);
        }

        return tracks;
    },

    getDiscoverTracks: () => {
        const gdata = get();
        if (gdata.data === null) return null;

        const tracks = [];
        for (const tid of gdata.data.v_discover) {
            const track = gdata.getTrack(tid);
            if (!track) continue;
            tracks.push(track);
        }

        return tracks;
    },
}));
