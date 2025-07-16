// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import React from "react";

import "./App.css";
import "./themes/index.css";

import Layout from "@components/Layout";
import { useGetContentApi } from "./hooks/useApi";
import { useContentStore } from "@stores/useContentStore";

function App() {
    const FVX_SET_DATA = useContentStore((s) => s.FVX_SET_DATA);
    const { data, loading, error } = useGetContentApi();
    if (data) FVX_SET_DATA(data);

    return (
        <Layout />
    );
}

export default App;
