import React from "react";

import clsx from "clsx";

import classes from "./index.module.css";


import LayoutHeader from "./header";
import LayoutSidebar from "./sidebar";
import LayoutPlayer from "./Player";
import LayoutContent from "./content";
import ErrorBoundary from "@components/ErrorBoundary";


const Layout = () => {
    const [sidebarHidden, setSidebarHidden] = React.useState<boolean>(false);


    return (
        <ErrorBoundary>
            <div className={clsx(classes.layout, sidebarHidden && classes.sidebarHidden)}>
                <LayoutHeader onMenuButtonClick={() => setSidebarHidden(!sidebarHidden)} />
                <LayoutSidebar sidebarHidden={sidebarHidden} />
                <LayoutContent />
                <LayoutPlayer />
            </div>
        </ErrorBoundary>
    );
};

export default Layout;
