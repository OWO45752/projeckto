import React from "react";

import clsx from "clsx";

import classes from "./index.module.css";


type SidebarButtonProps = React.PropsWithChildren<{
    disabled?: boolean;
    onClick?: () => never;
    active?: boolean;
}>;


const SidebarButton = (props: SidebarButtonProps) => <li>
    <button className={clsx(classes.btnSidenav, props.active && classes.active)}>
        {props.children}
    </button>
</li>;

export default SidebarButton;
