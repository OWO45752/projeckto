import React from "react";

import clsx from "clsx";

import classes from "./index.module.css";


import LayoutHeader from "./header";
import LayoutSidebar from "./sidebar";
import LayoutPlayer from "./Player";
import LayoutContent from "./content";
import ErrorBoundary from "@components/ErrorBoundary";
import HotkeyListener from "./hotkey";


const Layout = () => {
    const [sidebarHidden, setSidebarHidden] = React.useState<boolean>(false);


    return (
        <ErrorBoundary>
            <div className={clsx(classes.layout, sidebarHidden && classes.sidebarHidden)}>
                <LayoutHeader onMenuButtonClick={() => setSidebarHidden(!sidebarHidden)} />
                <LayoutSidebar sidebarHidden={sidebarHidden} />
                <LayoutContent />
                <LayoutPlayer />

                <HotkeyListener />
            </div>
        </ErrorBoundary>
    );
};

export default Layout;
