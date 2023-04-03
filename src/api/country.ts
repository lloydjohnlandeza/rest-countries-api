import useSWR from "swr";
import { Country } from "@/types/country";
const baseURL = "https://restcountries.com/";
const version = "v3.1/";
const fields =
  "name,capital,currencies,borders,languages,tld,region,subregion,population,flags";

const fetcher = async (endpoint: string) => {
  const url = new URL(`${baseURL}${version}${endpoint}`);
  url.searchParams.set("fields", fields);
  const res = await fetch(url);
  return res.json();
};

export function useGetCountries() {
  const { data, error, isLoading } = useSWR("all", fetcher);

  return {
    data: data as Country[],
    isLoading,
    isError: error,
  };
}
