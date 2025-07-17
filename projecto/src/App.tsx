import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";

import "./App.css";
import "./themes/index.css";

import { useGetContentApi } from "./hooks/useApi";
import { useContentStore } from "@stores/useContentStore";
import { useApplicationStore } from "@stores/useApplicationStore";

import Layout from "@components/Layout";

import ApplicationError from "@pages/ApplicationError";
import NotFound from "@pages/NotFound";


import HomePage from "@pages/Home";

import PlayQueuePage from "@pages/PlayQueue";
import SettingsPage from "@pages/Settings";

import TrackInfoPage from "@pages/TrackInfo";
import AlbumInfoPage from "@pages/AlbumInfo";


function App() {
    const loadApplicationStoreState = useApplicationStore(s => s.loadApplicationState);
    const FVX_SET_DATA = useContentStore((s) => s.FVX_SET_DATA);
    const { data, loading, error } = useGetContentApi();

    React.useEffect(() => {
        if (!loading) {
            FVX_SET_DATA(data, error);
        }
    }, [loading, data, error, FVX_SET_DATA]);

    React.useEffect(() => {
        loadApplicationStoreState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (error) return <ApplicationError />;

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />

                    <Route path="play-queue" element={<PlayQueuePage />} />
                    <Route path="settings" element={<SettingsPage />} />


                    <Route path="tracks/:trackId" element={<TrackInfoPage />} />
                    <Route path="albums/:albumId" element={<AlbumInfoPage />} />


                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
