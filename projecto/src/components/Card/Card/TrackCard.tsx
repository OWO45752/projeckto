import React from "react";

import { useContentStore } from "@stores/useContentStore";

import TrackImage from "@components/TrackImage";
import { Text } from "@components/Text";
import RegularButton from "@components/Buttons/RegularButton";

import { IconPlayerPlayFilled } from "@tabler/icons-react";
import ArtistText from "@components/ArtistText";

import classes from "./index.module.css";

interface TrackCardProp {
    title: string;
    artSrc: string;
    artistIds: string[]
    onPlayClick: () => void;
    onTitleClick?: () => void;
    artLoading?: "lazy" | "eager";
}

const TrackCard = (props: TrackCardProp) => {
    const getManyArtist = useContentStore(s => s.getManyArtist);

    const artists = React.useMemo(() => getManyArtist(...props.artistIds), [props.artistIds, getManyArtist]);

    return (
        <div className={classes.card}>
            <TrackImage size="14rem" src={props.artSrc} loading={props.artLoading} />

            <div className={classes.textContainer}>
                <Text as="p" size="lg" bold onClick={props.onTitleClick}>{props.title}</Text>
                <div>
                    <ArtistText artists={artists} size="lg" limit={3} />
                </div>
            </div>

            <div className={classes.buttonContainer}>
                <RegularButton onClick={props.onPlayClick}>
                    <IconPlayerPlayFilled size="1em" />
                    <span>Play</span>
                </RegularButton>
            </div>
        </div>
    );
};

export default TrackCard;
