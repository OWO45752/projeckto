import React from "react";

import classes from "./header.module.css";

import RegularButton from "@components/Buttons/RegularButton";

import { IconMenu2 } from "@tabler/icons-react";

interface LayoutHeaderProps {
    onMenuButtonClick: () => void;
    onProfileClick: () => void;
}


const LayoutHeader = (props: LayoutHeaderProps) => <div className={classes.layoutHeader}>
    <RegularButton onClick={props.onMenuButtonClick}>
        <IconMenu2 size="1em" />
    </RegularButton>

    <p className={classes.headerBrand}>MIKO</p>

    <div className={classes.rhs}>
        <img className={classes.profilePic} onClick={props.onProfileClick} src="/placeholder-profile.png" />
    </div>
</div>;

export default LayoutHeader;
