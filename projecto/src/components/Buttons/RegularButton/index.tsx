import React from "react";

import clsx from "clsx";

import classes from "./index.module.css";


type ButtonProps = React.PropsWithChildren<{
    disabled?: boolean;
    active?: boolean;
    variant?: "1" | "2";
    onClick?: () => void;
}>;


const RegularButton = (props: ButtonProps) => {
    return (
        <button
            className={clsx(
                classes.btnRegular,
                (props.variant || "1") === "1" ? classes.variant1 : classes.variant2,
                props.active && classes.active,
            )}
            disabled={props.disabled}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
};

export default RegularButton;
