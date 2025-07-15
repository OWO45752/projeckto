import React from "react";

import clsx from "clsx";

import classes from "./control.module.css";

import { Text } from "@components/Text";
import Slider from "@components/Slider";
import RegularButton from "@components/Buttons/RegularButton";
import { IconArrowsShuffle, IconPlayerPauseFilled, IconPlayerSkipBackFilled, IconPlayerSkipForwardFilled, IconRepeatOnce } from "@tabler/icons-react";


const PlayerControl = () => <div className={classes.playerControl}>
    <div className={classes.sliderContainer}>
        <Text size="sm" className={clsx(classes.sliderText, classes.r)}>00:00</Text>
        <Slider />
        <Text size="sm" className={clsx(classes.sliderText, classes.l)}>00:00</Text>
    </div>
    <div className={classes.controlContainer}>
        { /* TODO: Actions! */ }
        <RegularButton>
            <IconArrowsShuffle size="1em" />
        </RegularButton>

        <RegularButton>
            <IconPlayerSkipBackFilled size="1em" />
        </RegularButton>

        <RegularButton>
            <IconPlayerPauseFilled size="1em" />
        </RegularButton>

        <RegularButton>
            <IconPlayerSkipForwardFilled size="1em" />
        </RegularButton>

        <RegularButton>
            <IconRepeatOnce size="1em" />
        </RegularButton>
    </div>
</div>;

export default PlayerControl;
