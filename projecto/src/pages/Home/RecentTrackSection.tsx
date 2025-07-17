import React from "react";

import { useContentStore } from "@stores/useContentStore";
import { useApplicationStore } from "@stores/useApplicationStore";
import { usePlayerStore } from "@stores/usePlayerStore";

import { Text } from "@components/Text";
import RecentCard from "@components/Card/RecentCard";

import classes from "./index.module.css";

const RecentTrackSection = () => {
    const getManyTrack = useContentStore(s => s.getManyTrack);
    const recentTrackIds = useApplicationStore(s => s.recentTrackIds);
    const playTrack = usePlayerStore(s => s.setCurrentTrack);

    const recentTracks = React.useMemo(() => getManyTrack(...recentTrackIds), [recentTrackIds, getManyTrack]);

    if (recentTracks.length < 3) return <></>;

    return (
        <>
            <Text as="h1" bold>Recents</Text>
            <div className={classes.recentSection}>
                {recentTracks.map((t) =>
                    <RecentCard
                        key={t.id} // make sure each card has a unique key!
                        src={t.artwork}
                        title={t.title}
                        onPlayButtonClick={() => playTrack(t.id)}
                    />
                )}
            </div>
        </>
    );
};

export default RecentTrackSection;
