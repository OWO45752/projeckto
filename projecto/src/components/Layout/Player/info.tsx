import React from "react";

import { Text } from "@components/Text";
import { usePlayerStore } from "@stores/usePlayerStore";
import { useContentStore } from "@stores/useContentStore";

import TrackImage from "@components/TrackImage";

import ArtistText from "@components/ArtistText";

import classes from "./info.module.css";


const PlayerInfo = () => {
    const track = usePlayerStore((state) => state.currentTrack);
    const getManyArtist = useContentStore((state) => state.getManyArtist);
    const artists = track ? getManyArtist(...track.artist_ids) : [];

    return (
        <div className={classes.playerInfo}>
            <TrackImage src={track?.artwork} alt={track?.title} />
            <div className={classes.info}>
                <Text size="lg" bold className={classes.infoText} >{track ? track.title : "No Playing"}</Text>
                <div>
                    <ArtistText artists={artists} className={classes.infoText} limit={5} />
                </div>
            </div>
        </div>
    );
};

export default PlayerInfo;
