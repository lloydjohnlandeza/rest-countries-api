import React, {
  useMemo,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import Input from "@/components/Input";
import Dropdown from "@/components/Dropdown";
import CountryCard from "@/components/CountryCard";
import { useGetCountries } from "@/api/country";
import useIsAtBottom from "@/hooks/useIsAtBottom";

export default function Home() {
  const { data, isLoading, isError } = useGetCountries();
  const [regions, setRegions] = useState<Array<string>>([]);
  const [search, setSearch] = useState("");
  const [itemsToShow, setItemsToShow] = useState(50); // Set initial items to show
  const ref = useRef(null);
  const generateData = () => {
    if (!data) return [];
    let newData = [...data];
    newData = newData.filter((val) => {
      return val.name?.official.includes(search);
    });
    if (regions.length > 0) {
      newData = newData.filter((val) => {
        return val.region && regions.includes(val.region);
      });
    }
    setItemsToShow(itemsToShow);
    return newData;
  };
  const memoizedData = useMemo(generateData, [
    data,
    regions,
    search,
    itemsToShow,
  ]);

  const isAtBottom = useIsAtBottom(ref);

  const handleShowMore = useCallback(() => {
    setItemsToShow((prevItems) => {
      const nextItems = prevItems + 10;
      return nextItems > memoizedData.length ? memoizedData.length : nextItems;
    });
  }, [memoizedData.length, setItemsToShow]);

  useEffect(() => {
    if (isAtBottom) {
      handleShowMore();
    }
  }, [isAtBottom, handleShowMore]);

  const handleRegionChange = (e: string) => {
    const newRegions = [...regions];
    const index = newRegions.findIndex((r) => r === e);
    if (index === -1) {
      newRegions.push(e);
    } else {
      newRegions.splice(index, 1);
    }
    setRegions(newRegions);
    setItemsToShow(itemsToShow);
  };

  if (isLoading) {
    return <div>loading</div>;
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setItemsToShow(itemsToShow);
  };
  return (
    <main className="max-w-7xl mx-auto px-5">
      <Input
        onChange={handleSearch}
        className="mb-10"
        placeholder="Search for a country..."
      />
      <Dropdown
        onChange={handleRegionChange}
        className="mb-10"
        id="filter_by_region"
        options={["Africa", "Americas", "Asia", "Europe", "Oceania"]}
      />
      {regions.length > 0 && (
        <ul className="flex gap-2 mb-10">
          {regions.map((region) => (
            <li key={region}>
              <button
                className=" bg-gray-200 rounded-md text-xs p-2 hover:shadow-my"
                onClick={() => handleRegionChange(region)}
              >
                {region}
              </button>
            </li>
          ))}
        </ul>
      )}
      <div
        ref={ref}
        className="grid grid-cols-4 gap-10 max-xl:grid-cols-3 max-xl:gap-x-5 max-lg:grid-cols-2 max-md:grid-cols-1 justify-between"
      >
        {memoizedData.slice(0, itemsToShow).map((d, key) => (
          <CountryCard key={key} country={d} />
        ))}
      </div>
    </main>
  );
}
