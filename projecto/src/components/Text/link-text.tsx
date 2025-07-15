// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import React from "react";

import clsx from "clsx";

import classes from "./index.module.css";

import type { TextBoldStyleString, TextProps } from "./type";
import { Link, type RelativeRoutingType, type To } from "react-router";


export type LinkTextProps = Omit<TextProps, "as"> & {
    to: To;
    relative?: RelativeRoutingType;
    replace?: boolean;
    reloadDocument?: boolean;
};


const LinkText = (props: LinkTextProps) => {
    const variant = props.variant || "primary";
    const italic = props.italic || false;
    const size = props.size;

    let bold: TextBoldStyleString = "regular";
    if (props.bold) bold = props.bold === true ? "bold" : props.bold;


    return <Link
        className={clsx(
            classes.text,
            classes.link,
            classes[variant],
            italic && classes.italic,
            bold && classes[bold],
            size && classes[size],
            props.className
        )}
        style={props.style}

        to={props.to}
        relative={props.relative}
        replace={props.replace}
        reloadDocument={props.reloadDocument}
    >
        {props.children}
    </Link>;
};

export default LinkText;
