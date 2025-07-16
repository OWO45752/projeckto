export interface Track {
    id: string;
    title: string;
    artist_ids: string[];
    genres: string[];
    duration_ms: number;
    stream: string;
    artwork: string;
}

export interface Album {
    id: string;
    name: string;
    artist_ids: string[];
    artwork: string;
    track_ids: string[];
}

export interface Artist {
    id: string;
    name: string;
    album_ids: string[];
    track_ids: string[];
}

export type F_V_Featured = string[];
export type F_V_Discover = string[];

export interface IFApiResponse {
    tracks: Record<string, Track>;
    albums: Record<string, Album>;
    artists: Record<string, Artist>;

    v_featured: F_V_Featured;
    v_discover: F_V_Discover;
}
