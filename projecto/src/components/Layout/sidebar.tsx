import React from "react";

import classes from "./sidebar.module.css";
import { SidebarNavButton } from "@components/Buttons/Sidebar";

import {
    IconHome2,
    IconList,
    IconSettings2
} from "@tabler/icons-react";

interface LayoutSidebarProps {
    sidebarHidden: boolean;
}


const LayoutSidebar = (props: LayoutSidebarProps) => {
    if (props.sidebarHidden) return <></>;

    return (
        <nav className={classes.layoutSidebar} woof-element--layout-name="sidebar">
            <ul className={classes.sidebarContainer}>
                <SidebarNavButton to="/">
                    <IconHome2 size="1em" />
                    Home
                </SidebarNavButton>

                <SidebarNavButton to="/play-queue">
                    <IconList size="1em" />
                    Play Queue
                </SidebarNavButton>


                <div className={classes.scLow}>
                    <SidebarNavButton to="/settings">
                        <IconSettings2 size="1em" />
                        Settings
                    </SidebarNavButton>
                </div>
            </ul>
        </nav>
    );
};

export default LayoutSidebar;
