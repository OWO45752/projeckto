// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import React from "react";

import { Text } from "@components/Text";

import classes from "./index.module.css";

import cat from "./cat.png";

const ApplicationError = () => <div className={classes.appError}>
    <div className={classes.appErrorContainer}>
        <Text as="h1" style={{ textAlign: "center" }}>Unexpected Error Occurred</Text>
        <img src={cat} />
    </div>
</div>;

export default ApplicationError;
