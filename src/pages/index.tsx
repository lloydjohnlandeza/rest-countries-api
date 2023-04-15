import React, {
  useMemo,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { parse } from "url";
import Input from "@/components/Input";
import Dropdown from "@/components/Dropdown";
import CountryCard from "@/components/CountryCard";
import { getCountries, useGetCountries } from "@/api/country";
import useIsAtBottom from "@/hooks/useIsAtBottom";
import { AnimatePresence, motion } from "framer-motion";
import { Country } from "@/types/country";
import Head from "next/head";
import { useRouter } from "next/router";
import { debounce } from "lodash";

const itemsShowCount = 50;
export default function Home({ initialData }: { initialData: Country[] }) {
  const router = useRouter();

  const { countries, isLoading } = useGetCountries({ initialData });
  const [regions, setRegions] = useState<Array<string>>([]);
  const [search, setSearch] = useState("");
  const [itemsToShow, setItemsToShow] = useState(itemsShowCount); // Set initial items to show
  const ref = useRef(null);

  const generateData = () => {
    if (!countries) return [];
    let newData = [...countries];
    newData = newData.filter((val) => {
      return val.name?.official
        .toLocaleLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(
          search
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLocaleLowerCase()
        );
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
    countries,
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

  useEffect(() => {
    const currentQuery = parse(router.asPath, true).query;
    const search = (currentQuery.search as string) ?? "";
    setSearch(search);
  }, [router.query, router.asPath]);

  const handleRegionChange = (e: string) => {
    const newRegions = [...regions];
    const index = newRegions.findIndex((r) => r === e);
    if (index === -1) {
      newRegions.push(e);
    } else {
      newRegions.splice(index, 1);
    }
    setRegions(newRegions);
    setItemsToShow(itemsShowCount);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setItemsToShow(itemsShowCount);
    const { asPath } = router;
    const currentQuery = parse(asPath, true).query;
    router.push({
      pathname: "/",
      query: { ...currentQuery, search: e.target.value },
    });
  };

  const debouncedFunctionRef = useRef<(...args: any[]) => void>();
  debouncedFunctionRef.current = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleSearch(e);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedChange = useCallback(
    debounce((...args) => {
      if (debouncedFunctionRef.current) {
        debouncedFunctionRef.current(...args);
      }
    }, 500),
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedChange(e);
  };

  if (isLoading) {
    return <div className="max-w-7xl mx-auto px-5">loading</div>;
  }
  return (
    <>
      <Head>
        <title>List of Countries</title>
        <meta property="og:title" content="List of Countries" key="title" />
      </Head>
      <main className="max-w-7xl mx-auto px-5">
        <div className="grid md:grid-cols-2">
          <Input
            defaultValue={search}
            onChange={handleInputChange}
            className="dark:bg-my-dm-dark-blue bg-my-white"
            placeholder="Search for a country..."
          />
          <div className="md:ml-auto">
            <Dropdown
              onChange={handleRegionChange}
              className="dark:bg-my-dm-dark-blue bg-my-white"
              id="filter_by_region"
              options={["Africa", "Americas", "Asia", "Europe", "Oceania"]}
            />
          </div>
        </div>
        <ul className="flex gap-2 my-5">
          <AnimatePresence>
            {regions.map((region) => (
              <motion.li
                className="flex overflow-hidden"
                key={region}
                animate={{ height: "auto", opacity: 1 }}
                initial={{ height: 0, opacity: 0 }}
                exit={{ height: 0, opacity: 0 }}
              >
                <button
                  className="h-full p-2 dark:bg-my-dm-dark-blue bg-gray-200 rounded-md text-xs dark:hover:shadow-2xl hover:shadow-my"
                  onClick={() => handleRegionChange(region)}
                >
                  {region}
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
        <div
          ref={ref}
          className="grid grid-cols-4 gap-10 max-xl:grid-cols-3 max-xl:gap-x-5 max-lg:grid-cols-2 max-md:grid-cols-1 justify-between"
        >
          {memoizedData.slice(0, itemsToShow).map((d, key) => (
            <motion.div
              key={d.name?.official}
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
            >
              <CountryCard country={d} />
            </motion.div>
          ))}
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const data = await getCountries();

  return {
    props: {
      initialData: data,
    },
  };
}
