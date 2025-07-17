import React from "react";

import { useContentStore } from "@stores/useContentStore";

import { Text } from "@components/Text";
import { AlbumCard } from "@components/Card/Card";

import classes from "./index.module.css";

interface AlbumCardSectionProps {
    title: string;
    albumIds: string[];
    loading?: "lazy" | "eager"
}

const AlbumCardSection = (props: AlbumCardSectionProps) => {
    const getManyAlbum = useContentStore(s => s.getManyAlbum);

    const albums = React.useMemo(() => getManyAlbum(...props.albumIds), [props.albumIds, getManyAlbum]);

    return (
        <>
            <Text as="h1" bold>{props.title}</Text>
            <div className={classes.cardSection}>
                {albums.map((a) =>
                    <AlbumCard
                        artSrc={a.artwork}
                        title={a.name}
                        artistIds={a.artist_ids}
                        artLoading={props.loading}
                    />
                )}
            </div>
        </>
    );
};

export default AlbumCardSection;
