import React from "react";

import classes from "./content.module.css";

import { Outlet } from "react-router";


const LayoutContent = () => <div className={classes.layoutContent} woof-element--layout-name="content">
    <div className={classes.contentContainer}>
        <Outlet />
    </div>
</div>;

export default LayoutContent;
