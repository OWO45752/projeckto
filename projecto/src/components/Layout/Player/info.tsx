import React from "react";

import classes from "./info.module.css";

import TrackImage from "@components/TrackImage";
import { Text, AnchorText } from "@components/Text";
import { usePlayerStore } from "@stores/usePlayerStore";
import { useContentStore } from "@stores/useContentStore";


const PlayerInfo = () => {
    const track = usePlayerStore((state) => state.currentTrack);
    const getManyArtist = useContentStore((state) => state.getManyArtist);
    const artists = track ? getManyArtist(...track.artist_ids) : [];

    return (
        <div className={classes.playerInfo}>
            <TrackImage src={track?.artwork} alt={track?.title} />
            <div className={classes.info}>
                <Text size="lg" bold className={classes.infoText} >{track ? track.title : "No Playing"}</Text>
                <Text size="sm">
                    {artists.map((artist, i) =>
                        <AnchorText
                            key={artist.id}
                            className={classes.infoText}
                        >
                            {artist.name}
                            {i < artists.length - 1 ? ", " : ""}
                        </AnchorText>
                    )}
                </Text>
            </div>
        </div>
    );
};

export default PlayerInfo;
