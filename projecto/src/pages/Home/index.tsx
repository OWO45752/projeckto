import React from "react";

import { Text } from "@components/Text";

import { useContentStore } from "@stores/useContentStore";
import { useApplicationStore } from "@stores/useApplicationStore";
import { usePlayerStore } from "@stores/usePlayerStore";

import classes from "./index.module.css";
import RecentCard from "@components/Card/RecentCard";

const HomePage = () => {
    const getManyTrack = useContentStore(s => s.getManyTrack);
    const applicationStore = useApplicationStore();

    const recentTracks = getManyTrack(...applicationStore.recentTrackIds);

    return (
        <>
            <Text as="h1" bold>Recents</Text>
            <div className={classes.recentSection}>
                {recentTracks.map((t) =>
                    <RecentCard
                        src={t.artwork}
                        title={t.title}
                    />
                )}
            </div>

            <div />

            <Text as="h1" bold>Featured</Text>
        </>
    );
};

export default HomePage;
