
import React from "react";

import { useContentStore } from "@stores/useContentStore";
import { usePlayerStore } from "@stores/usePlayerStore";

import { Text } from "@components/Text";
import ArtistText from "@components/ArtistText";

import { timeTextsify } from "@miko/utils";

import classes from "./index.module.css";
import RegularButton from "@components/Buttons/RegularButton";
import { IconPlayerPlayFilled } from "@tabler/icons-react";


interface TrackMetaInfoProps {
    trackId: string;
    artistIds: string[];
    duration: number;
}

const TrackMetaInfo = (props: TrackMetaInfoProps) => {
    const getManyArtist = useContentStore(s => s.getManyArtist);
    const playTrack = usePlayerStore(s => s.setCurrentTrack);

    const artists = React.useMemo(() => getManyArtist(...props.artistIds), [props.artistIds, getManyArtist]);

    return (
        <div className={classes.trackMetaInfo}>
            <Text as="h1" bold>C U Again</Text>

            <div>
                <ArtistText artists={artists} size="lg" />
            </div>

            <Text as="p" size="lg" variant="secondary">{timeTextsify(props.duration)}</Text>

            <div>
                <RegularButton onClick={() => playTrack(props.trackId)} >
                    <IconPlayerPlayFilled size="1em" />
                    Play
                </RegularButton>
            </div>
        </div>
    );
};

export default TrackMetaInfo;
