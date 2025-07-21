import type { Album, Artist, IFApiResponse, Track } from "@miko/types";
import { create } from "zustand";
import lunr from "lunr";

interface SearchOptions {
    limit?: number;
    types?: ("track" | "album")[]; // Filter results by type
}

export type SearchResultItem = { type: "album", item: Album } | { type: "track", item: Track };

interface ContentStore {

    // Existing...
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
    getFeaturedTrackIds: () => string[] | null;
    getDiscoverTracks: () => Track[] | null;
    getDiscoverTrackIds: () => string[] | null;
    getAllTrackIds: () => string[] | null;
    getAllAlbumIds: () => string[] | null;

    // Lunr
    lunrIndex: lunr.Index | null;
    buildSearchIndex: () => void;
    search: (term: string, options?: SearchOptions) => SearchResultItem[];
}

export const useContentStore = create<ContentStore>((set, get) => ({
    isReady: false,
    data: null,
    error: null,
    lunrIndex: null,

    FVX_SET_DATA: (data, error = null) => {
        set({
            data,
            error,
            isReady: error === null && data !== null,
        });

        if (data && error === null) {
            get().buildSearchIndex(); // Rebuild index on new data
        }
    },

    getTrack: (id) => get().data?.tracks[id] || null,
    getManyTrack: (...ids) => ids.map(get().getTrack).filter(Boolean) as Track[],
    getArtist: (id) => get().data?.artists[id] || null,
    getManyArtist: (...ids) => ids.map(get().getArtist).filter(Boolean) as Artist[],
    getAlbum: (id) => get().data?.albums[id] || null,
    getManyAlbum: (...ids) => ids.map(get().getAlbum).filter(Boolean) as Album[],

    getFeaturedTracks: () => {
        const data = get().data;
        if (!data) return null;
        return data.v_featured.map(id => get().getTrack(id)).filter(Boolean) as Track[];
    },
    getFeaturedTrackIds: () => get().data?.v_featured ?? null,

    getDiscoverTracks: () => {
        const data = get().data;
        if (!data) return null;
        return data.v_discover.map(id => get().getTrack(id)).filter(Boolean) as Track[];
    },
    getDiscoverTrackIds: () => get().data?.v_discover ?? null,

    getAllTrackIds: () => {
        const gdata = get();
        if (gdata.data === null) return null;
        return Object.keys(gdata.data.tracks);
    },

    getAllAlbumIds: () => {
        const gdata = get();
        if (gdata.data === null) return null;
        return Object.keys(gdata.data.albums);
    },

    buildSearchIndex: () => {
        const data = get().data;
        if (!data) return;

        const builder = new lunr.Builder();

        builder.ref("ref");
        builder.field("title");
        builder.field("type");

        // Add Tracks
        for (const track of Object.values(data.tracks)) {
            builder.add({
                ref: `track:${track.id}`,
                title: track.title,
                type: "track",
            });
        }

        // Add Albums
        for (const album of Object.values(data.albums)) {
            builder.add({
                ref: `album:${album.id}`,
                title: album.name,
                type: "album",
            });
        }

        const index = builder.build();
        set({ lunrIndex: index });
    },

    // eslint-disable-next-line sonarjs/cognitive-complexity
    search: (term, options) => {
        const index = get().lunrIndex;
        const data = get().data;
        if (!index || !data) return [];

        const types = options?.types ?? ["track", "album"];
        const limit = options?.limit ?? 10;

        const results = index.search(`*${term}*`);

        const items: SearchResultItem[] = [];

        for (const result of results) {
            const [type, id] = result.ref.split(":") as ["track" | "album", string];
            if (!types.includes(type)) continue;

            if (type === "track") {
                const item = data.tracks[id];
                if (item) items.push({ type, item });
            }

            if (type === "album") {
                const item = data.albums[id];
                if (item) items.push({ type, item });
            }

            if (items.length >= limit) break;
        }

        return items;
    },
}));
