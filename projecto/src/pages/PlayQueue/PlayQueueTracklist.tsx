import React from "react";

import { useContentStore } from "@stores/useContentStore";
import { usePlayerStore } from "@stores/usePlayerStore";

import { WidePlayQueueCard } from "@components/Card/Wide";

import classes from "./index.module.css";
import { Text } from "@components/Text";

interface AlbumTracklistProps {
    trackIds: string[];
}


const PlayQueueTracklist = (props: AlbumTracklistProps) => {
    const getManyTracks = useContentStore(s => s.getManyTrack);

    const playTrack = usePlayerStore(s => s.setCurrentTrack);
    const removeTrack = usePlayerStore(s => s.removeTrackFromQueue);

    const currentTrack = usePlayerStore(s => s.currentTrack);

    const tracks = React.useMemo(() => getManyTracks(...props.trackIds), [getManyTracks, props.trackIds]);

    if (tracks.length === 0) return <Text variant="secondary">No tracks.</Text>;

    return (
        <div className={classes.trackList}>
            {tracks.map((t) =>
                <WidePlayQueueCard
                    key={t.id}
                    src={t.artwork}
                    title={t.title}
                    artistIds={t.artist_ids}

                    active={t.id === currentTrack?.id}

                    onPlayButtonClick={() => playTrack(t.id)}
                    onCloseButtonClick={() => removeTrack(t.id)}
                />
            )}
        </div>
    );
};

export default PlayQueueTracklist;
