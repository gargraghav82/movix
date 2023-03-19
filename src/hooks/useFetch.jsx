import { useEffect, useState } from "react";
import { fecthAPIdata } from "../utils/api";
const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading("loading...");
        setData(null);
        setError(null);

        fecthAPIdata(url)
            .then((res) => {
                setData(res);
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
            })
            .catch((err) => {
                setLoading(false);
                setError("Something went wrong!");
            });
    }, [url]);

    return { data, loading, error };
};

export default useFetch;