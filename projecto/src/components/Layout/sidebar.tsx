import React from "react";

import classes from "./sidebar.module.css";
import { SidebarButton } from "@components/Buttons/Sidebar";
import { usePlayerStore } from "@stores/usePlayerStore";

interface LayoutSidebarProps {
    sidebarHidden: boolean;
}


const LayoutSidebar = (props: LayoutSidebarProps) => {
    const setCurrentTrack = usePlayerStore((s) => s.setCurrentTrack);
    const addTTQ = usePlayerStore((s) => s.addTrackToQueue);

    addTTQ("5");
    addTTQ("64");
    addTTQ("67");
    addTTQ("32");

    if (props.sidebarHidden) return <></>;

    return (
        <nav className={classes.layoutSidebar} woof-element--layout-name="sidebar">
            <ul className={classes.sidebarContainer}>
                <SidebarButton onClick={() => setCurrentTrack("10")}>AWA</SidebarButton>
                <SidebarButton onClick={() => setCurrentTrack("1")}>OWO</SidebarButton>
            </ul>
        </nav>
    );
};

export default LayoutSidebar;
