import React from "react";

import { useParams } from "react-router";
import { useContentStore } from "@stores/useContentStore";

import TrackImage from "@components/TrackImage";
import { Text } from "@components/Text";

import classes from "./index.module.css";
import TrackMetaInfo from "./TrackMetaInfo";
import NotFound from "@pages/NotFound";


const TrackInfoPage = () => {
    const { trackId } = useParams();

    const getTrack = useContentStore(s => s.getTrack);

    const track = React.useMemo(() => getTrack(trackId ?? ""), [trackId, getTrack]);

    if (!track) return <NotFound />;

    return (
        <>
            <div className={classes.trackMeta}>
                <TrackImage
                    src={track.artwork}

                    size="14rem"
                />

                <TrackMetaInfo
                    artistIds={track.artist_ids}
                    trackId={track.id}
                    duration={track.duration_ms}
                />
            </div>

            <div />

            <Text variant="secondary" italic>No Description</Text>
        </>
    );
};

export default TrackInfoPage;
