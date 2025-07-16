import React from "react";
import type { IFApiResponse } from "@miko/types";

export const useGetContentApi = () => {
    const [data, setData] = React.useState<IFApiResponse | null>(null);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<Error | null>(null);

    React.useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        (async() => {
            try {
                const res = await fetch("/api/index.json", { signal });

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const fetchedData = await res.json();
                setData(fetchedData);
                setError(null);
            } catch(e) {
                if ((e as Error).name === "AbortError") {
                    console.log("Fetch aborted");
                    return;
                }
                setError(e as Error);
            } finally {
                setLoading(false);
            }
        })();

        return () => {
            controller.abort();
        };
    }, []);

    return { data, loading, error };
};
