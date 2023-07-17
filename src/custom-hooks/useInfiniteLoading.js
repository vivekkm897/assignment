import { useCallback, useEffect, useRef, useState } from "react";

import { toast } from "react-toastify";

import { AUTH_TOKEN, BASE_URL, USERS_TABLE } from "../utils/constants";

export default function useInfiniteLoading({ path }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nextRef, setNextRef] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const handleError = ({ status }) => {
      if (status === 422) {
        // could've added one more condition while checking 422 if i had sample error json for LIST_RECORDS_ITERATOR_NOT_AVAILABLE
        setData(null);
        setNextRef(null);
        setPageNumber(1);
      } else toast.error("Some error occured.");
    };

    (async () => {
      setLoading(true);
      let response;
      try {
        response = await fetch(
          `${BASE_URL}/${USERS_TABLE}?${
            nextRef ? `offset=${nextRef}&` : ""
          }${path}`,
          {
            headers: { Authorization: "Bearer " + AUTH_TOKEN },
          }
        );

        if (!response.ok) {
          return handleError(response);
        }

        const { records, offset } = await response.json();

        setData((r) => [...(r || []), ...(records || [])]);
        setNextRef(offset ?? -1);
      } catch (error) {
        toast.error("Some error occured.");
      }

      setLoading(false);
    })();
  }, [pageNumber]);

  const observer = useRef();
  const lastCardRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && nextRef !== -1) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, nextRef]
  );

  return { data, loading, lastCardRef };
}
