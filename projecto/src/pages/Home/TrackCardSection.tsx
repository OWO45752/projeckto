import React from "react";

import { usePlayerStore } from "@stores/usePlayerStore";
import { useContentStore } from "@stores/useContentStore";
import { useNavigate } from "react-router";

import { Text } from "@components/Text";
import { TrackCard } from "@components/Card/Card";

import classes from "./index.module.css";

interface CardSectionProps {
    title: string;
    trackIds: string[];
    loading?: "lazy" | "eager"
}

const TrackCardSection = (props: CardSectionProps) => {
    const getManyTrack = useContentStore(s => s.getManyTrack);
    const playTrack = usePlayerStore(s => s.setCurrentTrack);

    const navigate = useNavigate();

    const tracks = React.useMemo(() => getManyTrack(...props.trackIds), [props.trackIds, getManyTrack]);

    return (
        <>
            <Text as="h1" bold>{props.title}</Text>
            {tracks.length === 0 ?
                <Text variant="secondary">No tracks found.</Text>
                : <div className={classes.cardSection}>
                    {tracks.map((t) =>
                        <TrackCard
                            key={t.id}
                            title={t.title}
                            artistIds={t.artist_ids}
                            artSrc={t.artwork}

                            onPlayClick={() => playTrack(t.id)}
                            onTitleClick={() => navigate(`/tracks/${t.id}`)}

                            artLoading={props.loading}
                        />
                    )}
                </div>}
        </>
    );
};

export default TrackCardSection;
