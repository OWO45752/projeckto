// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import React from "react";

import { useHotkeys } from "react-hotkeys-hook";
import { usePlayerStore } from "@stores/usePlayerStore";
import { useNavigate } from "react-router";


const HotkeyListener = () => {
    const {
        togglePlay,
        toggleMute,

        prev,
        next,

        toggleShuffle,
        cycleRepeatMode,
    } = usePlayerStore();


    const navigate = useNavigate();


    //


    useHotkeys("space", () => togglePlay());
    useHotkeys("m", () => toggleMute());

    useHotkeys("shift+p", () => prev());
    useHotkeys("shift+n", () => next());

    useHotkeys("shift+s", () => toggleShuffle());
    useHotkeys("shift+r", () => cycleRepeatMode());


    //


    useHotkeys("t>e>t>r>i>s", () => navigate("/_/owo/tetris"), { sequenceTimeoutMs: 2000 });


    //


    return <></>;
};

export default HotkeyListener;
