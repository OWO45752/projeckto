import React from "react";

import { usePlayerStore } from "@stores/usePlayerStore";

import ReactHowler from "react-howler";

const Audio = () => {
    const {
        currentTrack,

        audioLoaded,
        setAudioLoaded,

        isPlaying,
        play,

        setCurrentTime,

        setAudioSeekTimeValue,
        audioSeekTimeValue,

        autoNext,
    } = usePlayerStore();

    const howlerRef = React.useRef<ReactHowler | null>(null);

    const audioOnLoad = () => {
        setAudioLoaded(true);
        play();
    };

    React.useEffect(() => {
        if (!isPlaying || !audioLoaded) return;

        const interval = setInterval(() => {
            if (howlerRef.current) {
                const time = howlerRef.current.seek();
                setCurrentTime(time * 1000);
            }
        }, 150);

        return () => clearInterval(interval);
    }, [audioLoaded, isPlaying, setCurrentTime]);

    React.useEffect(() => {
        if (!howlerRef.current || audioSeekTimeValue === null) return;

        howlerRef.current.seek(audioSeekTimeValue === 0 ? 0 : audioSeekTimeValue / 1000);
        setAudioSeekTimeValue(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ audioSeekTimeValue ]);

    if (!currentTrack) return <></>;

    return (
        <div
            style={{
                display: "none",
                visibility: "hidden",
                opacity: 0,
            }}
        >
            <ReactHowler
                src={currentTrack.stream}
                ref={howlerRef}

                onLoad={audioOnLoad}
                onEnd={() => autoNext()}

                playing={isPlaying}
            />
        </div>
    );
};

export default Audio;
