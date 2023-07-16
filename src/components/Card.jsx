import { useEffect, useState } from "react";

import { LineChart, Line, Tooltip } from "recharts";
import moment from "moment";

import { currencyFormatter, integerFormatter } from "../utils/utils";
import Avatar from "./Avatar";

export default function Card({
  lastCardRef,
  name,
  avatar,
  occupation,
  revenue,
  impressions,
  conversionsCount,
  conversions,
  width,
}) {
  const [changeColor, setChangeColor] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setChangeColor(true);
    }, 400);
  }, []);

  const calculateWidth = () => {
    if (width < 740) return width - 160;
    else if (width < 1099) return width / 2 - 170;
    else if (width < 1448) return width / 3 - 170;
    else return 230;
  };

  return (
    <div
      className={`border-[3px] border-black rounded-lg p-2 xl:p-3 ${
        changeColor ? "bg-white" : "bg-green-200"
      } transition-[background-color] duration-700`}
      ref={lastCardRef}
    >
      <div className="flex">
        <div className="shrink-0">
          <Avatar avatar={avatar} firstLetter={name?.slice?.(0, 1)} />
        </div>
        <div className="ml-4">
          <h2
            className="text-2xl text-gray-900 font-bold line-clamp-1"
            title={name}
          >
            {name}
          </h2>
          <h4
            className="text-slate-400 font-[500] line-clamp-1"
            title={occupation}
          >
            {occupation}
          </h4>
        </div>
      </div>

      <div className="flex relative pb-1">
        {conversionsCount && (
          <div>
            <LineChart
              width={calculateWidth()}
              height={120}
              data={conversions}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <Tooltip cursor={false} content={<CustomTooltip />} />
              <Line
                type="linear"
                dataKey="conversionsCount"
                stroke="#8884d8"
                yAxisId="conversionsCount"
                xAxisId="day"
                activeDot={{ r: 4 }}
                dot={false}
              />
            </LineChart>
          </div>
        )}
        <div className="text-right w-[120px] ml-auto">
          <div className="text-orange-600 font-semibold leading-4">
            {integerFormatter(impressions)}
          </div>
          <div className="text-gray-400 text-sm leading-4">impressions</div>

          <div className="text-blue-600 font-semibold leading-4 mt-2">
            {integerFormatter(conversionsCount)}
          </div>
          <div className="text-gray-400 text-sm leading-4">conversions</div>

          <div className="text-green-600 font-bold text-lg mt-3">
            ${currencyFormatter(revenue)}
          </div>
        </div>
        <div className="absolute bottom-0 left-8 text-xs text-gray-600">
          Conversions
          {moment(conversions?.[0].day).format(" MM/DD")} -
          {moment(conversions?.[conversions.length - 1].day).format(" MM/DD")}
        </div>
      </div>
    </div>
  );
}

const CustomTooltip = ({ active, payload }) => {
  return active && payload && payload.length ? (
    <div className="bg-gray-200 p-1 rounded-md shadow-xl">
      <div className="font-semibold">
        {moment(payload[0].payload.day).format("MM/DD")}
      </div>
      <div className="text-sm">
        {payload[0].payload.conversionsCount} conversions
      </div>
    </div>
  ) : null;
};
