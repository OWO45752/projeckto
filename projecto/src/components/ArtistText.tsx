import React from "react";

import type { Artist } from "@miko/types";

import { AnchorText, Text } from "./Text";
import { useContentStore } from "@stores/useContentStore";

interface ArtistTextProps {
    artistIds?: string[];
    artists?: Artist[];
    className?: string;
    size?: "lg" | "md" | "sm";
    limit?: number;
    variant?: "primary" | "secondary"
}

const ArtistText = (props: ArtistTextProps) => {
    const getManyArtists = useContentStore(s => s.getManyArtist);

    const variant = props.variant || "secondary";

    const artists = React.useMemo(() => {
        if (props.artists) return props.artists;

        if (!props.artistIds) return [];

        return getManyArtists(...props.artistIds);
    }, [props.artistIds, props.artists, getManyArtists]);

    if (artists.length === 0) return <></>;

    if (props.limit && artists.length > props.limit) return (
        <Text as="p" size={props.size} variant={variant} className={props.className}>Various Artists</Text>
    );

    return (
        <>
            {artists.map((artist, i) =>
                <AnchorText
                    key={artist.id}
                    className={props.className}
                    variant={variant}
                    size={props.size}
                >
                    {artist.name}
                    {i < artists.length - 1 ? ", " : ""}
                </AnchorText>
            )}
        </>
    );
};

export default ArtistText;
