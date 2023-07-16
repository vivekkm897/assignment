import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import { IMPORTS } from "../utils/constants";

export default function useDynamicImport({ fileId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { default: data } = await IMPORTS[fileId]();
        setData(data);
      } catch (e) {
        toast.error("Something went wrong. Please refresh the page.");
      }
      setLoading(false);
    })();
  }, []);

  return { data, loading };
}
