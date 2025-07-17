import React from "react";

import type { Artist } from "@miko/types";

import { AnchorText, Text } from "./Text";

interface ArtistTextProps {
    artists: Artist[];
    className?: string;
    size?: "lg" | "md" | "sm";
    limit?: number;
    variant?: "primary" | "secondary"
}

const ArtistText = (props: ArtistTextProps) => {
    const variant = props.variant || "secondary";

    if (props.limit && props.artists.length > props.limit) return (
        <Text as="p" size={props.size} variant={variant} className={props.className}>Various Artists</Text>
    );

    return (
        <>
            {props.artists.map((artist, i) =>
                <AnchorText
                    key={artist.id}
                    className={props.className}
                    variant={variant}
                    size={props.size}
                >
                    {artist.name}
                    {i < props.artists.length - 1 ? ", " : ""}
                </AnchorText>
            )}
        </>
    );
};

export default ArtistText;
