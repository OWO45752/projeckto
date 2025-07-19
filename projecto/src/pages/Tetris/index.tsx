// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import React from "react";

import Tetris from "react-tetris";

import { Text } from "@components/Text";


import classes from "./index.module.css";
import RegularButton from "@components/Buttons/RegularButton";


const GameTetrisPage = () => {
    return (
        <div className={classes.container}>
            <Tetris
                keyboardControls={{

                    // Default values shown here. These will be used if no
                    // `keyboardControls` prop is provided.
                    down: "MOVE_DOWN",
                    left: "MOVE_LEFT",
                    right: "MOVE_RIGHT",
                    space: "HARD_DROP",
                    z: "FLIP_COUNTERCLOCKWISE",
                    x: "FLIP_CLOCKWISE",
                    up: "FLIP_CLOCKWISE",
                    p: "TOGGLE_PAUSE",
                    c: "HOLD",
                    shift: "HOLD"
                }}
            >
                {({
                    HeldPiece,
                    Gameboard,
                    PieceQueue,
                    points,
                    linesCleared,
                    state,
                    controller
                }) =>
                    <>
                        <div className={classes.infoContainer}>
                            <div>
                                <Text as="p" size="lg">Points: {points}</Text>
                                <Text as="p" size="lg">Lines cleared: {linesCleared}</Text>
                            </div>
                            <HeldPiece />
                        </div>
                        <Gameboard />
                        <PieceQueue />
                        <div style={{ width: "6.25rem" }}>
                            {state === "LOST" && <>
                                <Text as="p" size="lg">Game Over</Text>
                                <RegularButton onClick={controller.restart}>New Game</RegularButton>
                            </>}
                        </div>
                    </>}
            </Tetris>
        </div>
    );
};

export default GameTetrisPage;
