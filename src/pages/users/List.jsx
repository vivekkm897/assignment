import { useEffect, useState } from "react";

import useDynamicImport from "../../custom-hooks/useDynamicImport";
import useInfiniteLoading from "../../custom-hooks/useInfiniteLoading";
import useCardsList from "./useCardsList";

export default function List({ setLoader }) {
  const { data: activites, loading: importing } = useDynamicImport({
    fileId: "logs",
  });
  const {
    data: users,
    loading,
    lastCardRef,
  } = useInfiniteLoading({ path: "pageSize=20&sort%5B0%5D%5Bfield%5D=Name" });

  const [sortby, setSortby] = useState("name");
  const { cardsList } = useCardsList({ activites, users, sortby, lastCardRef });

  // display/hide loader
  useEffect(() => {
    if (!importing && !loading) setLoader(false);
    else setLoader(true);
  }, [importing, loading]);

  return (
    <>
      {Boolean(cardsList?.length) && (
        <SortCardsList sortby={sortby} setSortby={setSortby} />
      )}
      <div className="grid gap-x-4 gap-y-5 grid-cols-auto p-2 sm:p-5">
        {cardsList}
      </div>
    </>
  );
}

const SortCardsList = ({ sortby, setSortby }) => (
  <div className="text-white p-2 sm:p-5">
    <div className="font-bold text-orange-400">Sort the loaded data by:</div>
    <div className="flex items-center space-x-1 h-10">
      {["name", "conversions", "impressions", "revenue"].map((label) => {
        return (
          <label className="flex items-center" key={label}>
            <input
              type="radio"
              value={label}
              checked={sortby === label}
              onChange={() => setSortby(label)}
              className="mr-[2px] mt-[2px] leading-4"
            />

            <span className="">{label}</span>
          </label>
        );
      })}
    </div>
  </div>
);
