// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import React from "react";

import clsx from "clsx";

import classes from "./index.module.css";

import type { TextBoldStyleString, TextProps } from "./type";


export type AnchorTextProps = Omit<TextProps, "as"> & {
    href?: string;
};


const AnchorText = (props: AnchorTextProps) => {
    const variant = props.variant || "primary";
    const italic = props.italic || false;
    const size = props.size;

    let bold: TextBoldStyleString = "regular";
    if (props.bold) bold = props.bold === true ? "bold" : props.bold;


    return <a
        className={clsx(
            classes.text,
            classes.link,
            classes[variant],
            italic && classes.italic,
            bold && classes[bold],
            size && classes[size],
            !props.href && classes.noClick,
            props.className
        )}
        style={props.style}

        href={props.href}
    >
        {props.children}
    </a>;
};

export default AnchorText;
