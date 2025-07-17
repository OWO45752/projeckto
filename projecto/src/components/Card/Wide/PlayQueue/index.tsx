import React from "react";

import TrackImage from "@components/TrackImage";
import { Text } from "@components/Text";
import RegularButton from "@components/Buttons/RegularButton";
import { IconPlayerPlayFilled, IconX } from "@tabler/icons-react";

import clsx from "clsx";

import classes from "../index.module.css";

interface WidePlayQueueCardProps {
    src: string
    title: string
    onPlayButtonClick?: () => void;
    onCloseButtonClick?: () => void;
    className?: string;
    active?: boolean;
}

const WidePlayQueueCard = (props: WidePlayQueueCardProps) => <div className={clsx(classes.wideCard, props.active && classes.active, props.className)} >
    <TrackImage src={props.src} size="3rem" />
    <Text bold style={{ flex: 1 }}>{props.title}</Text>
    <div className={classes.buttonContainer}>
        <RegularButton onClick={props.onCloseButtonClick} variant="2">
            <IconX size="1em" />
        </RegularButton>

        <RegularButton onClick={props.onPlayButtonClick} variant="2">
            <IconPlayerPlayFilled size="1em" />
        </RegularButton>
    </div>
</div>;

export default WidePlayQueueCard;
