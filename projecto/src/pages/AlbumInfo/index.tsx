import React from "react";

import { useParams } from "react-router";
import { useContentStore } from "@stores/useContentStore";

import TrackImage from "@components/TrackImage";
import { Text } from "@components/Text";

import classes from "./index.module.css";
import AlbumMetaInfo from "./AlbumMetaInfo";
import NotFound from "@pages/NotFound";
import AlbumTracklist from "./AlbumTracklist";


const AlbumInfoPage = () => {
    const { albumId: albumId } = useParams();

    const getAlbum = useContentStore(s => s.getAlbum);

    const album = React.useMemo(() => getAlbum(albumId ?? ""), [albumId, getAlbum]);

    if (!album) return <NotFound />;

    return (
        <>
            <div className={classes.albumMeta}>
                <TrackImage
                    src={album.artwork}

                    size="14rem"
                />

                <AlbumMetaInfo
                    albumId={album.id}
                    albumName={album.name}
                    artistIds={album.artist_ids}
                />
            </div>

            <div />

            <Text as="h1" bold>Tracklist</Text>

            <AlbumTracklist trackIds={album.track_ids} />
        </>
    );
};

export default AlbumInfoPage;
