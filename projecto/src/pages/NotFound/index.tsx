// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import React from "react";

import Brand from "@components/Brand";
import { Text } from "@components/Text";

import classes from "./index.module.css";


const NotFound = () => <div className={classes.container}>
    <Brand />
    <Text bold style={{ fontSize: "3rem" }}>Page not found</Text>
    <Text size="lg">We can&#x2019;t seem to find the page you are looking for.</Text>
</div>;

export default NotFound;
