import useSWR from "swr";
import { Country } from "@/types/country";
const baseURL = "https://restcountries.com/";
const version = "v3.1/";
// const basedFields =
//   "name,capital,currencies,borders,languages,tld,region,subregion,population,flags";

const fetcher = async ({
  endpoint,
  fields,
}: {
  endpoint: string;
  fields: string;
}) => {
  const url = new URL(`${baseURL}${version}${endpoint}`);
  url.searchParams.set("fields", fields);
  const res = await fetch(url);
  return res.json();
};

export function useGetCountries(
  fields = "name,region,capital,flags,population"
) {
  const { data, error, isLoading } = useSWR(
    { endpoint: "all", fields },
    fetcher
  );

  return {
    data: data as Country[],
    isLoading,
    isError: error,
  };
}
