import React from "react";

import classes from "./index.module.css";

import PlayerInfo from "./info";
import PlayerControl from "./control";
import PlayerMisc from "./misc";

// TODO: Work on this
const LayoutPlayer = () => {
    return (
        <div className={classes.layoutPlayer}>
            <PlayerInfo />
            <PlayerControl />
            <PlayerMisc />
        </div>
    );
};

export default LayoutPlayer;
