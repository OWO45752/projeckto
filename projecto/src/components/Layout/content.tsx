import React from "react";

import { Outlet } from "react-router";

import { useContentStore } from "@stores/useContentStore";
import { useApplicationStore } from "@stores/useApplicationStore";

import LayoutContentLoading from "./Loading";
import ErrorBoundary from "@components/ErrorBoundary";

import classes from "./content.module.css";


const LayoutContent = () => {
    const isContentStoreReady = useContentStore(s => s.isReady);

    const isApplicationStoreReady = useApplicationStore(s => s.isReady);

    const isReady = React.useMemo(() => {
        return isContentStoreReady && isApplicationStoreReady;
    }, [isContentStoreReady, isApplicationStoreReady]);


    return (
        <div className={classes.layoutContent} woof-element--layout-name="content">
            <div className={classes.contentContainer}>
                <ErrorBoundary>
                    {isReady ? <Outlet /> : <LayoutContentLoading />}
                </ErrorBoundary>
            </div>
        </div>
    );
};

export default LayoutContent;
