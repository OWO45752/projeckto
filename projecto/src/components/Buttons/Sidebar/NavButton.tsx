import React from "react";

import clsx from "clsx";

import classes from "./Button/index.module.css";
import { NavLink, type RelativeRoutingType, type To } from "react-router";


type SidebarButtonProps = React.PropsWithChildren<{
    disabled?: boolean;

    to: To;
    relative?: RelativeRoutingType;
    replace?: boolean;
    reloadDocument?: boolean;
}>;


const SidebarNavButton = (props: SidebarButtonProps) => <li>
    <NavLink
        className={(rp) => clsx(classes.btnSidenav, rp.isActive && classes.active)}

        to={props.to}
        relative={props.relative}
        replace={props.replace}
        reloadDocument={props.reloadDocument}
    >
        {props.children}
    </NavLink>
</li>;

export default SidebarNavButton;
