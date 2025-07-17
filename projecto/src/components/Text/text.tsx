import React from "react";

import clsx from "clsx";

import classes from "./index.module.css";


type TextBoldStyleString = "light" | "regular" | "medium" | "semibold" | "bold";

type TextProps = React.PropsWithChildren<{
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
    variant?: "primary" | "secondary";
    bold?: boolean | TextBoldStyleString;
    italic?: boolean;
    className?: string;
    size?: "lg" | "md" | "sm";
    style?: React.CSSProperties;
    onClick?: () => void;
}>;


const Text = (props: TextProps) => {
    const Component = props.as || "p";
    const variant = props.variant || "primary";
    const italic = props.italic || false;
    const size = props.size;

    let bold: TextBoldStyleString = "regular";
    if (props.bold) bold = props.bold === true ? "bold" : props.bold;


    return <Component
        className={clsx(
            classes.text,
            classes[variant],
            italic && classes.italic,
            bold && classes[bold],
            size && classes[size],
            props.onClick && classes.clickable,
            props.className
        )}

        style={props.style}

        onClick={props.onClick}
    >
        {props.children}
    </Component>;
};

export default Text;
