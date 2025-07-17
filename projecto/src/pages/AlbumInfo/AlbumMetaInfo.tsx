
import React from "react";

import { useContentStore } from "@stores/useContentStore";

import { Text } from "@components/Text";
import ArtistText from "@components/ArtistText";

import classes from "./index.module.css";


interface TrackMetaInfoProps {
    albumId: string;
    albumName: string;
    artistIds: string[];
}

const AlbumMetaInfo = (props: TrackMetaInfoProps) => {
    const getManyArtist = useContentStore(s => s.getManyArtist);

    const artists = React.useMemo(() => getManyArtist(...props.artistIds), [props.artistIds, getManyArtist]);

    return (
        <div className={classes.albumMetaInfo}>
            <Text as="h1" bold>{props.albumName}</Text>

            <div>
                <ArtistText artists={artists} size="lg" />
            </div>
        </div>
    );
};

export default AlbumMetaInfo;
