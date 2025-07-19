// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import React from "react";

import classes from "./misc.module.css";
import { IconVolume, IconVolume2, IconVolume3, IconVolumeOff } from "@tabler/icons-react";
import Slider from "@components/Slider";
import { usePlayerStore } from "@stores/usePlayerStore";


const PlayerMisc = () => {
    const { volume, setVolume, isMute, setIsMute, toggleMute, currentTrack, audioLoaded } = usePlayerStore();

    const onVolumeChange = (v: number) => {
        setVolume(v / 100);

        if (isMute) setIsMute(false);
    };


    const getVolumeIcon = () => {
        if (isMute) return IconVolumeOff;

        if (volume === 0) return IconVolume3;
        if (volume <= 0.5) return IconVolume2;
        return IconVolume;
    };

    const VolumeIconComponent = getVolumeIcon();


    const isDisabled = currentTrack === null || !audioLoaded;

    return (
        <div className={classes.playerMisc}>
            <div className={classes.volumeContainer}>
                <VolumeIconComponent size="1em" onClick={() => toggleMute()} className={classes.volumeIcon} />
                <div className={classes.volumeSliderContainer}>
                    <Slider
                        min={0}
                        max={100}
                        value={volume * 100}

                        onChange={(v) => onVolumeChange(v as number)}

                        disabled={isDisabled}
                    />
                </div>
            </div>
        </div>
    );
};

export default PlayerMisc;
