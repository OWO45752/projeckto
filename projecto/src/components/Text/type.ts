import React from "react";

export type TextBoldStyleString = "light" | "regular" | "medium" | "semibold" | "bold";

export type TextProps = React.PropsWithChildren<{
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
    variant?: "primary" | "secondary";
    bold?: boolean | TextBoldStyleString;
    italic?: boolean;
    className?: string;
    size?: "lg" | "md" | "sm";
    style?: React.CSSProperties;
}>;
