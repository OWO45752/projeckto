import React from "react";

import TrackImage from "@components/TrackImage";
import { Text } from "@components/Text";
import RegularButton from "@components/Buttons/RegularButton";
import { IconPlayerPlayFilled } from "@tabler/icons-react";
import ArtistText from "@components/ArtistText";

import clsx from "clsx";

import classes from "../index.module.css";

interface WidePlayCardProps {
    src: string;
    title: string;
    artistIds?: string[];
    onPlayButtonClick?: () => void;
    className?: string;
    active?: boolean;
    solid?: boolean;
}

const WidePlayCard = (props: WidePlayCardProps) => <div className={clsx(classes.wideCard, props.active && classes.active, props.solid && classes.solid, props.className)} >
    <TrackImage src={props.src} size="3rem" />

    <div className={classes.textContainer}>
        <Text bold style={{ flex: 1 }}>{props.title}</Text>
        <ArtistText artistIds={props.artistIds} />
    </div>

    <div className={classes.buttonContainer}>
        <RegularButton onClick={props.onPlayButtonClick} variant="2">
            <IconPlayerPlayFilled size="1em" />
        </RegularButton>
    </div>
</div>;

export default WidePlayCard;
