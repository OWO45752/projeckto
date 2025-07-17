import React from "react";

import classes from "./index.module.css";

import TrackImage from "@components/TrackImage";
import { Text } from "@components/Text";
import RegularButton from "@components/Buttons/RegularButton";
import { IconPlayerPlayFilled } from "@tabler/icons-react";

interface RecentCardProps {
    src: string
    title: string
    onPlayButtonClick?: () => void;
}

const RecentCard = (props: RecentCardProps) => <div className={classes.recentCard} >
    <TrackImage src={props.src} size="3rem" />
    <Text bold style={{ flex: 1 }}>{props.title}</Text>
    <div className={classes.buttonContainer}>
        <RegularButton onClick={props.onPlayButtonClick} variant="2">
            <IconPlayerPlayFilled size="1em" />
        </RegularButton>
    </div>
</div>;

export default RecentCard;
