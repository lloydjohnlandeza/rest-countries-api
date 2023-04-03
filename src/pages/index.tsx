import React from "react";
import Input from "@/components/Input";
import Dropdown from "@/components/Dropdown";
import CountryCard from "@/components/CountryCard";
import { Country } from "@/types/country";
import { useGetCountries } from "@/api/country";

export default function Home() {
  const country = {
    name: "Germany",
    topLevelDomain: [".de"],
    alpha2Code: "DE",
    alpha3Code: "DEU",
    callingCodes: ["49"],
    capital: "Berlin",
    altSpellings: [
      "DE",
      "Federal Republic of Germany",
      "Bundesrepublik Deutschland",
    ],
    subregion: "Central Europe",
    region: "Europe",
    population: 83240525,
    latlng: [51, 9],
    demonym: "German",
    area: 357114,
    gini: 31.9,
    timezones: ["UTC+01:00"],
    borders: ["AUT", "BEL", "CZE", "DNK", "FRA", "LUX", "NLD", "POL", "CHE"],
    nativeName: "Deutschland",
    numericCode: "276",
    flags: {
      svg: "https://flagcdn.com/de.svg",
      png: "https://flagcdn.com/w320/de.png",
    },
    currencies: [
      {
        code: "EUR",
        name: "Euro",
        symbol: "€",
      },
    ],
    languages: [
      {
        iso639_1: "de",
        iso639_2: "deu",
        name: "German",
        nativeName: "Deutsch",
      },
    ],
    translations: {
      br: "Alamagn",
      pt: "Alemanha",
      nl: "Duitsland",
      hr: "Njemačka",
      fa: "آلمان",
      de: "Deutschland",
      es: "Alemania",
      fr: "Allemagne",
      ja: "ドイツ",
      it: "Germania",
      hu: "Grúzia",
    },
    flag: "https://flagcdn.com/de.svg",
    regionalBlocs: [
      {
        acronym: "EU",
        name: "European Union",
      },
    ],
    cioc: "GER",
    independent: true,
  };
  const { data, isLoading, isError } = useGetCountries();
  if (isLoading) {
    return <div>loading</div>;
  }
  return (
    <main className="px-5">
      <Input className="mb-10" placeholder="Search for a country..." />
      <Dropdown
        className="mb-10"
        id="filter_by_region"
        options={["Africa", "America"]}
      />
      <div className="grid gap-6">
        {data.map((d, key) => (
          <CountryCard key={key} country={d} />
        ))}
      </div>
    </main>
  );
}
