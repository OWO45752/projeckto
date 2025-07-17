import React from "react";

import { useContentStore } from "@stores/useContentStore";
import { usePlayerStore } from "@stores/usePlayerStore";

import WidePlayCard from "@components/Card/Wide/Play";

import classes from "./index.module.css";

interface AlbumTracklistProps {
    trackIds: string[];
}


const AlbumTracklist = (props: AlbumTracklistProps) => {
    const getManyTracks = useContentStore(s => s.getManyTrack);
    const playTrack = usePlayerStore(s => s.setCurrentTrack);
    const currentTrack = usePlayerStore(s => s.currentTrack);

    const tracks = React.useMemo(() => getManyTracks(...props.trackIds), [getManyTracks, props.trackIds]);

    return (
        <div className={classes.trackList}>
            {tracks.map((t) =>
                <WidePlayCard
                    key={t.id}
                    src={t.artwork}
                    title={t.title}
                    artistIds={t.artist_ids}

                    active={t.id === currentTrack?.id}

                    onPlayButtonClick={() => playTrack(t.id)}
                />
            )}
        </div>
    );
};

export default AlbumTracklist;
