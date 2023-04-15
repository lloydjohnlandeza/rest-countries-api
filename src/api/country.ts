import useSWR from "swr";
import { Country } from "@/types/country";
const baseURL = "https://restcountries.com/";
const version = "v3.1/";

const fetcher = async ({
  endpoint,
  params,
}: {
  endpoint: string;
  params: Array<{ name: string; value: string }>;
}) => {
  const url = new URL(`${baseURL}${version}${endpoint}`);
  params.map((param) => {
    url.searchParams.set(param.name, param.value);
  });
  const res = await fetch(url);
  return res.json();
};

export function useGetCountries({
  fields = "name,region,capital,flags,population",
  initialData,
}: {
  fields?: string;
  initialData: Country[];
}) {
  const { data, error, isLoading } = useSWR<Country[]>(
    { endpoint: "all", params: [{ name: "fields", value: fields }] },
    fetcher,
    {
      fallbackData: initialData,
    }
  );

  return {
    countries: data,
    isLoading,
    isError: error,
  };
}

export async function getCountries(
  fields = "name,region,capital,flags,population"
) {
  const endpoint = "all";
  const params = [{ name: "fields", value: fields }];
  const url = new URL(`${baseURL}${version}${endpoint}`);
  params.map((param) => {
    url.searchParams.set(param.name, param.value);
  });

  const res = await fetch(url);
  return res.json();
}

export function useFindCountryByFullName({
  name,
  initialData,
  fields = "name,capital,currencies,borders,languages,tld,region,subregion,population,flags",
}: {
  name: string;
  initialData: Country[];
  fields?: string;
}) {
  const { data, error, isLoading } = useSWR<Country[]>(
    {
      endpoint: `name/${name}`,
      params: [
        { name: "fields", value: fields },
        { name: "fullText", value: true },
      ],
    },
    fetcher,
    {
      fallbackData: initialData,
    }
  );
  let country: Country = {};
  if (data && data.length > 0) {
    country = data[0];
  }
  return {
    country: country,
    isLoading,
    isError: error,
  };
}

export async function findCountry(
  name: string,
  fields = "name,capital,currencies,borders,languages,tld,region,subregion,population,flags",
  byName = true
) {
  const api = byName ? "name" : "alpha";
  const endpoint = `${api}/${name}`;
  const params = [{ name: "fields", value: fields }];
  const url = new URL(`${baseURL}${version}${endpoint}`);
  params.map((param) => {
    url.searchParams.set(param.name, param.value);
  });

  const res = await fetch(url);
  return res.json();
}
