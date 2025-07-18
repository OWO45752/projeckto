// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import React from "react";

import classes from "./index.module.css";

import PlayerInfo from "./info";
import PlayerControl from "./control";
import PlayerMisc from "./misc";

import Audio from "./audio";

const LayoutPlayer = () => {
    return (
        <div className={classes.layoutPlayer}>
            <Audio />

            <PlayerInfo />
            <PlayerControl />
            <PlayerMisc />
        </div>
    );
};

export default LayoutPlayer;
