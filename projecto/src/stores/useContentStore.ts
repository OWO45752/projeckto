import type { Album, Artist, IFApiResponse, Track } from "@miko/types";
import { create } from "zustand";

interface ContentStore {
    getTrack: (id: string) => Track | null;
    getManyTrack: (...ids: string[]) => Track[];

    getArtist: (id: string) => Artist | null;
    getManyArtist: (...ids: string[]) => Artist[];

    getAlbum: (id: string) => Album | null;
    getManyAlbum: (...ids: string[]) => Album[];

    isReady: boolean;

    data: IFApiResponse | null;
    error: Error | null;
    FVX_SET_DATA: (data: IFApiResponse | null, error: Error | null) => void;

    getFeaturedTracks: () => Track[] | null;
    getDiscoverTracks: () => Track[] | null;
}

export const useContentStore = create<ContentStore>((set, get) => ({
    isReady: false,
    data: null,
    error: null,
    FVX_SET_DATA: (data, error = null) => set({ data, error: error, isReady: error === null }),


    getTrack: (id) => {
        const data = get().data;
        if (data === null) return null;

        return data.tracks[id] || null;
    },

    getManyTrack: (...ids) => ids.map(get().getTrack).filter(Boolean) as Track[],


    getArtist: (id) => {
        const data = get().data;
        if (data === null) return null;

        return data.artists[id] || null;
    },

    getManyArtist: (...id) => {
        const gdata = get();

        const artists: Artist[] = [];
        for (const e of id) {
            const xa = gdata.getArtist(e);
            if (xa) artists.push(xa);
        }

        return artists;
    },


    getAlbum: (id) => {
        const data = get().data;
        if (data === null) return null;

        return data.albums[id] || null;
    },

    getManyAlbum: (...id) => {
        const gdata = get();

        const albums: Album[] = [];
        for (const e of id) {
            const xa = gdata.getAlbum(e);
            if (xa) albums.push(xa);
        }

        return albums;
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
