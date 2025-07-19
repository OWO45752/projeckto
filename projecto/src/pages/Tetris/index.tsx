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
                    down: "MOVE_DOWN",
                    left: "MOVE_LEFT",
                    right: "MOVE_RIGHT",
                    v: "HARD_DROP",
                    z: "FLIP_COUNTERCLOCKWISE",
                    x: "FLIP_CLOCKWISE",
                    up: "FLIP_CLOCKWISE",
                    o: "TOGGLE_PAUSE",
                    c: "HOLD",
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
                            <div>
                                <Text as="p" size="lg" bold>Controls</Text>
                                <table>
                                    <thead>
                                        <tr>
                                            <th><Text as="p" size="md">Key</Text></th>
                                            <th><Text as="p" size="md">Action</Text></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><Text as="p" size="md">Arrow down:</Text></td>
                                            <td><Text as="p" size="md">Move down</Text></td>
                                        </tr>
                                        <tr>
                                            <td><Text as="p" size="md">Arrow left:</Text></td>
                                            <td><Text as="p" size="md">Move left</Text></td>
                                        </tr>
                                        <tr>
                                            <td><Text as="p" size="md">Arrow right:</Text></td>
                                            <td><Text as="p" size="md">Move right</Text></td>
                                        </tr>
                                        <tr>
                                            <td><Text as="p" size="md">V:</Text></td>
                                            <td><Text as="p" size="md">Hard drop</Text></td>
                                        </tr>
                                        <tr>
                                            <td><Text as="p" size="md">Z:</Text></td>
                                            <td><Text as="p" size="md">flip counter clockwise</Text></td>
                                        </tr>
                                        <tr>
                                            <td><Text as="p" size="md">X, Arrow Up:</Text></td>
                                            <td><Text as="p" size="md">flip clock wise</Text></td>
                                        </tr>
                                        <tr>
                                            <td><Text as="p" size="md">O:</Text></td>
                                            <td><Text as="p" size="md">Pause/Resume</Text></td>
                                        </tr>
                                        <tr>
                                            <td><Text as="p" size="md">C</Text></td>
                                            <td><Text as="p" size="md">Hold</Text></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <Gameboard />
                        <PieceQueue />
                        <div style={{ width: "6.25rem" }}>
                            {state === "LOST" && <>
                                <Text as="p" size="lg">Game Over</Text>
                                <RegularButton onClick={controller.restart}>New Game</RegularButton>
                            </>}

                            {state === "PAUSED" && <>
                                <Text as="p" size="lg">Game Paused</Text>
                            </>}
                        </div>
                    </>}
            </Tetris>
        </div>
    );
};

export default GameTetrisPage;
