import React from "react";

import { Text } from "@components/Text";

import nyancat from "./nyancat.svg";

import classes from "./index.module.css";

const LayoutContentLoading = () => <div className={classes.loadingContainer}>
    <div className={classes.loadingOverlay}>
        <img src={nyancat} className={classes.loadingImage} />
        <Text
            as="h1"
            className={classes.loadingText}
            variant="primary"
            style={{ background: "var(--bg-primary-color)", padding: "0px 8px" }}
        >
            Loading
        </Text>
    </div>
</div>;

export default LayoutContentLoading;
