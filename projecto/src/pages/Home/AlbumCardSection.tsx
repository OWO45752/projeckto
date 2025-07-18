import React from "react";

import { useContentStore } from "@stores/useContentStore";
import { useNavigate } from "react-router";

import { Text } from "@components/Text";
import { AlbumCard } from "@components/Card/Card";

import classes from "./index.module.css";
import { usePlayerStore } from "@stores/usePlayerStore";

interface AlbumCardSectionProps {
    title: string;
    albumIds: string[];
    loading?: "lazy" | "eager"
}

const AlbumCardSection = (props: AlbumCardSectionProps) => {
    const getManyAlbum = useContentStore(s => s.getManyAlbum);
    const playAlbum = usePlayerStore(s => s.setQueue);

    const navigate = useNavigate();

    const albums = React.useMemo(() => getManyAlbum(...props.albumIds), [props.albumIds, getManyAlbum]);

    return (
        <>
            <Text as="h1" bold>{props.title}</Text>
            <div className={classes.cardSection}>
                {albums.map((a) =>
                    <AlbumCard
                        key={a.id}
                        artSrc={a.artwork}
                        title={a.name}
                        artistIds={a.artist_ids}
                        artLoading={props.loading}

                        onTitleClick={() => navigate(`/albums/${a.id}`)}
                        onPlayClick={() => playAlbum(a.track_ids)}
                    />
                )}
            </div>
        </>
    );
};

export default AlbumCardSection;
