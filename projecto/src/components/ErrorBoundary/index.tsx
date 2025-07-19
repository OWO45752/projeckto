import React from "react";

import { ErrorBoundary as RErrorBoundary, type FallbackProps } from "react-error-boundary";

import Brand from "@components/Brand";
import { Text } from "@components/Text";

import classes from "./index.module.css";


const fallbackRender = (props: FallbackProps) => {
    const { error } = props;

    const isError = error instanceof Error;

    return (
        <div className={classes.errorBoundary}>
            <Brand />
            <Text as="h1" style={{ textAlign: "center" }}>Unexpected Error Occurred</Text>

            {isError &&
                <div className={classes.errorBoundaryContainer}>
                    <Text as="h3">&#x3E; Name:</Text>
                    <pre>{error.name}</pre>

                    <Text as="h3">&#x3E; Message:</Text>
                    <pre>{error.message}</pre>

                    {error.stack &&
                        <>
                            <Text as="h3">&#x3E; Stack trace:</Text>
                            <pre>{error.stack}</pre>
                        </>}
                </div>}
        </div>
    );
};


//


interface ErrorBoundaryProps {
    children: React.ReactNode;
}

const ErrorBoundary = (props: ErrorBoundaryProps) => <RErrorBoundary
    fallbackRender={fallbackRender}
>
    {props.children}
</RErrorBoundary>;

export default ErrorBoundary;
