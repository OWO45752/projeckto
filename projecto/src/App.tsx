import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";

import "./App.css";
import "./themes/index.css";

import { useGetContentApi } from "./hooks/useApi";
import { useContentStore } from "@stores/useContentStore";

import Layout from "@components/Layout";
import ApplicationError from "@pages/ApplicationError";
import HomePage from "@pages/Home";

function App() {
    const FVX_SET_DATA = useContentStore((s) => s.FVX_SET_DATA);
    const { data, loading, error } = useGetContentApi();

    React.useEffect(() => {
        if (!loading) {
            FVX_SET_DATA(data, error);
        }
    }, [loading, data, error, FVX_SET_DATA]);

    if (error) return <ApplicationError />;

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
