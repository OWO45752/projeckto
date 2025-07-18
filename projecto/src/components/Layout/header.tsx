// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import React from "react";

import classes from "./header.module.css";

import RegularButton from "@components/Buttons/RegularButton";
import Brand from "@components/Brand";

import { IconMenu2 } from "@tabler/icons-react";

interface LayoutHeaderProps {
    onMenuButtonClick: () => void;
}


const LayoutHeader = (props: LayoutHeaderProps) => <div className={classes.layoutHeader}>
    <RegularButton onClick={props.onMenuButtonClick}>
        <IconMenu2 size="1em" />
    </RegularButton>

    <Brand />

    <div className={classes.rhs}>
        <img className={classes.profilePic} src="/placeholder-profile.png" />
    </div>
</div>;

export default LayoutHeader;
