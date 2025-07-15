import React from "react";

import classes from "./info.module.css";

import TrackImage from "@components/TrackImage";
import { Text, AnchorText } from "@components/Text";


const PlayerInfo = () => <div className={classes.playerInfo}>
    <TrackImage src="/placeholder-track.webp" alt="owo" />
    <div className={classes.info}>
        <Text size="lg" bold className={classes.infoText}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit tempore veritatis quae fuga ex. Quam ab officiis alias sequi deserunt! Unde dicta sunt, minima dolore eum obcaecati vero sit nisi?</Text>
        <Text size="sm">
            <AnchorText href="/oow" className={classes.infoText}>UWU</AnchorText>
            , <AnchorText href="/oow" className={classes.infoText}>UWU</AnchorText>
            , <AnchorText href="/oow" className={classes.infoText}>UWU</AnchorText>
        </Text>
    </div>
</div>;

export default PlayerInfo;
