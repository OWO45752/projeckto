import React from "react";

import classes from "./content.module.css";

import { Outlet } from "react-router";
import { useContentStore } from "@stores/useContentStore";
import { useApplicationStore } from "@stores/useApplicationStore";
import LayoutContentLoading from "./Loading";


const LayoutContent = () => {
    const isContentStoreReady = useContentStore(s => s.isReady);

    const isApplicationStoreReady = useApplicationStore(s => s.isReady);

    const isReady = React.useMemo(() => {
        return isContentStoreReady && isApplicationStoreReady;
    }, [isContentStoreReady, isApplicationStoreReady]);


    return (
        <div className={classes.layoutContent} woof-element--layout-name="content">
            <div className={classes.contentContainer}>
                {isReady ? <Outlet /> : <LayoutContentLoading />}
            </div>
        </div>
    );
};

export default LayoutContent;
