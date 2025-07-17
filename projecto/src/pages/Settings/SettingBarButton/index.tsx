import React from "react";

import type { Icon, IconProps } from "@tabler/icons-react";

import { Text } from "@components/Text";

import clsx from "clsx";

import classes from "./index.module.css";

interface SettingBarButtonProps {
    icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
    text: string;
    onClick?: () => void;
}

const SettingBarButton = (props: SettingBarButtonProps) => <div className={(clsx(classes.sbb, props.onClick && classes.clickable))} onClick={props.onClick} >
    <div className={classes.textContainer}>
        <props.icon size={"1em"} />
        <Text size="lg">{props.text}</Text>
    </div>
</div>;

export default SettingBarButton;
