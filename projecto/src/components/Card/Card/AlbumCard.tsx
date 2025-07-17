import React from "react";

import { useContentStore } from "@stores/useContentStore";

import classes from "./index.module.css";

import TrackImage from "@components/TrackImage";
import { Text } from "@components/Text";

import ArtistText from "@components/ArtistText";

interface AlbumCardProp {
    title: string;
    artSrc: string;
    artistIds: string[]
    onTitleClick?: () => void;
    artLoading?: "lazy" | "eager";
}

const AlbumCard = (props: AlbumCardProp) => {
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
        </div>
    );
};

export default AlbumCard;
