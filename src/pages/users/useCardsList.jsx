import { useEffect, useState } from "react";

import moment from "moment";

import useWindowDimensions from "../../custom-hooks/useWindowDimensions";
import Card from "../../components/Card";

export default function useCardsList({
  activites,
  users,
  sortby,
  lastCardRef,
}) {
  const { width } = useWindowDimensions({});

  const [list, setList] = useState({});

  useEffect(() => {
    if (!activites) return;

    const map = new Map();
    activites?.forEach(({ user_id, time, type, revenue }) => {
      const day = moment(time).format("YYYY-MM-DD");
      if (map.has(user_id)) {
        const data = map.get(user_id);
        data.impressions += type === "impression";
        data.conversionsCount += type === "conversion";
        if (type === "conversion") {
          if (day in data.conversions) data.conversions[day] += 1;
          else data.conversions[day] = 1;
        }
        data.revenue += revenue;

        map.set(user_id, data);
      } else
        map.set(user_id, {
          id: user_id,
          revenue,
          impressions: type === "impression",
          conversionsCount: type === "conversion",
          conversions: type === "conversion" ? { [day]: 1 } : {},
        });
    });

    const data = Object.fromEntries(map.entries());
    for (let key in data) {
      data[key] = {
        ...data[key],
        conversions: Array.from(Object.entries(data[key].conversions))
          .sort((a, b) => a[0].localeCompare(b[0]))
          .map(([day, conversionsCount]) => ({
            day,
            conversionsCount,
          })),
      };
    }

    setList(data);
  }, [activites]);

  useEffect(() => {
    if (users && activites) {
      setList((l) => {
        const list = { ...l };

        users.forEach(({ fields }) => {
          const { Id, Name, avatar, occupation } = fields || {};
          if (Id in list)
            list[Id] = { ...list[Id], name: Name, avatar, occupation };
        });

        return list;
      });
    }
  }, [users, activites]);

  const data = users?.map(({ fields: { Id } }) => ({ ...list[Id] }));
  const cardsList = data
    ?.sort((a, b) => {
      if (sortby === "name") return a?.name?.localeCompare(b?.name);
      else if (sortby === "conversions")
        return a?.["conversionsCount"] - b?.["conversionsCount"];
      return a?.[sortby] - b?.[sortby];
    })
    ?.map(
      (
        {
          revenue,
          conversions,
          conversionsCount,
          impressions,
          name,
          avatar,
          occupation,
          id,
        },
        index
      ) => (
        <Card
          lastCardRef={index === users?.length - 1 ? lastCardRef : null}
          key={id}
          name={name}
          avatar={avatar}
          occupation={occupation}
          revenue={revenue}
          impressions={impressions}
          conversionsCount={conversionsCount}
          conversions={conversions}
          width={width}
        />
      )
    );

  return { cardsList };
}
