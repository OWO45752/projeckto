// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import React from "react";

import { Text } from "@components/Text";
import { usePlayerStore } from "@stores/usePlayerStore";
import PlayQueueTracklist from "./PlayQueueTracklist";


const PlayQueuePage = () => {
    const playQueue = usePlayerStore(s => s.queue);

    return (
        <>
            <Text as="h1" bold>Play Queue</Text>

            <PlayQueueTracklist trackIds={playQueue} />
        </>
    );
};

export default PlayQueuePage;
