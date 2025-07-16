import React from "react";

import clsx from "clsx";

import classes from "./control.module.css";

import { Text } from "@components/Text";
import Slider from "@components/Slider";
import RegularButton from "@components/Buttons/RegularButton";
import { IconArrowsShuffle, IconPlayerPauseFilled, IconPlayerPlayFilled, IconPlayerSkipBackFilled, IconPlayerSkipForwardFilled, IconRepeat, IconRepeatOff, IconRepeatOnce } from "@tabler/icons-react";

import { usePlayerStore } from "@stores/usePlayerStore";
import { timeStringify } from "@miko/utils";

const PlayerControl = () => {
    const buttonVariant = "2";

    const {
        currentTrack,
        isPlaying,
        currentTime,
        isShuffle,
        repeatMode,
        togglePlay,
        next,
        prev,
        setCurrentTime,
        toggleShuffle,
        cycleRepeatMode,

        audioLoaded,

        setAudioSeekTimeValue
    } = usePlayerStore();

    const [isSeeking, setIsSeeking] = React.useState<boolean>(false);
    const [seekValue, setSeekValue] = React.useState<number>(0);

    const sliderOnChange = (value: number) => {
        setSeekValue(value);
        setIsSeeking(true);
    };

    const sliderOnChangeComplete = (value: number) => {
        setCurrentTime(value);
        setAudioSeekTimeValue(value);
        setIsSeeking(false);
    };

    const getRepeatIcon = () => {
        switch (repeatMode) {
            case "off":
                return <IconRepeatOff size="1em" />;
            case "one":
                return <IconRepeatOnce size="1em" />;
            case "all":
                return <IconRepeat size="1em" />;
            default:
                return <IconRepeatOff size="1em" />;
        }
    };

    const isDisabled = currentTrack === null || !audioLoaded;

    return (
        <div className={classes.playerControl}>
            <div className={classes.sliderContainer}>
                <Text size="sm" className={clsx(classes.sliderText, classes.r)}>
                    {timeStringify(currentTime)}
                </Text>
                <Slider
                    min={0}
                    max={currentTrack?.duration_ms || 0}
                    value={isSeeking ? seekValue : currentTime}
                    onChange={(v) => sliderOnChange(v as number)}
                    onChangeComplete={(v) => sliderOnChangeComplete(v as number)}
                    disabled={isDisabled}
                />
                <Text size="sm" className={clsx(classes.sliderText, classes.l)}>
                    {currentTrack ? timeStringify(currentTrack.duration_ms) : "00:00"}
                </Text>
            </div>
            <div className={classes.controlContainer}>
                <RegularButton
                    onClick={toggleShuffle}
                    disabled={isDisabled}
                    active={isShuffle}

                    variant={buttonVariant}
                >
                    <IconArrowsShuffle size="1em" />
                </RegularButton>

                <RegularButton
                    onClick={prev}
                    disabled={isDisabled}

                    variant={buttonVariant}
                >
                    <IconPlayerSkipBackFilled size="1em" />
                </RegularButton>

                <RegularButton
                    onClick={togglePlay}
                    disabled={isDisabled}

                    variant={buttonVariant}
                >
                    {isPlaying ?
                        <IconPlayerPauseFilled size="1em" />
                        :
                        <IconPlayerPlayFilled size="1em" />}
                </RegularButton>

                <RegularButton
                    onClick={next}
                    disabled={isDisabled}

                    variant={buttonVariant}
                >
                    <IconPlayerSkipForwardFilled size="1em" />
                </RegularButton>

                <RegularButton
                    onClick={cycleRepeatMode}
                    disabled={isDisabled}

                    variant={buttonVariant}
                >
                    {getRepeatIcon()}
                </RegularButton>
            </div>
        </div>
    );
};

export default PlayerControl;
