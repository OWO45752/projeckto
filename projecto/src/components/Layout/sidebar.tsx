import React from "react";

import classes from "./sidebar.module.css";

type LayoutSidebarProps = React.PropsWithChildren<{
    sidebarHidden: boolean;
}>;


const LayoutSidebar = (props: LayoutSidebarProps) => {
    if (props.sidebarHidden) return <></>;

    return (
        <nav className={classes.layoutSidebar} woof-element--layout-name="sidebar">
            <ul className={classes.sidebarContainer}>
                {props.children}
            </ul>
        </nav>
    );
};

export default LayoutSidebar;
