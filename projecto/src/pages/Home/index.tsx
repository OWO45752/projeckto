import React from "react";

import { useContentStore } from "@stores/useContentStore";

import RecentTrackSection from "./RecentTrackSection";
import TrackCardSection from "./TrackCardSection";
import AlbumCardSection from "./AlbumCardSection";

const HomePage = () => {
    const featuredTrackIds = useContentStore((s) => s.getFeaturedTrackIds());
    const discoverTrackIds = useContentStore((s) => s.getDiscoverTrackIds());

    const getAllTrackIds = useContentStore((s) => s.getAllTrackIds);
    const getAllAlbumIds = useContentStore((s) => s.getAllAlbumIds);

    const allTrackIds = React.useMemo(() => getAllTrackIds(), [getAllTrackIds]);
    const allAlbumIds = React.useMemo(() => getAllAlbumIds(), [getAllAlbumIds]);


    return (
        <>
            <RecentTrackSection />

            <div />

            {featuredTrackIds && <TrackCardSection title="Featured" trackIds={featuredTrackIds} />}

            <div />

            {discoverTrackIds && <TrackCardSection title="Discover" trackIds={discoverTrackIds} loading="lazy" />}

            <div />

            {allTrackIds && <TrackCardSection title="All Tracks" trackIds={allTrackIds} loading="lazy" />}

            <div />

            {allAlbumIds && <AlbumCardSection title="All Albums" albumIds={allAlbumIds} loading="lazy" />}
        </>
    );
};

export default HomePage;
