import React from "react";

import clsx from "clsx";

import classes from "./index.module.css";

import { IconPhoto } from "@tabler/icons-react";


interface TrackImageProps {
    src?: string;
    alt?: string;
    size?: number | string;
    borderRadius?: number | string;
}


const TrackImage = (props: TrackImageProps) => {
    const size = props.size || 70;
    const borderRadius = props.borderRadius || 8;

    const style: React.CSSProperties = {
        width: size,
        height: size,
        borderRadius: borderRadius,
    };

    if (props.src) return (
        <img
            className={classes.trackImage}
            style={style}
            src={props.src}
            alt={props.alt}
        />
    );
    else return (
        <div
            className={clsx(classes.trackImage, classes.trackImageDiv)}
            style={style}
        >
            <IconPhoto size={"50%"} />
        </div>
    );
};

export default TrackImage;
