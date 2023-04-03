import React, { useEffect, useState } from "react";
import IconSearch from "@/components/IconSearch";
import { Country } from "@/types/country";
// import useFetch from "../../fetch/index";
import Link from "next/link";

const CountryView: React.FC<Country> = (props) => {
  const [country, setCountry] = useState<Country>();

  // useEffect(() => {
  //   (async () => {
  //     const response = await useFetch("name/United States");
  //     if (typeof response === "object" && response.length)
  //       setCountry(response[0]);
  //   })();
  // }, []);

  return (
    <main className="px-5 pb-5">
      <Link
        className="inline-flex items-center gap-2 px shadow-my transition-shadow hover:shadow-lg border border-my-lm-very-light-gray rounded-md px-6 py-1 text-sm"
        href="/"
      >
        <IconSearch /> Back
      </Link>
      <img className="min-w-full mt-10" src={country?.flags.png} />
      <h1 className="my-6 text-xl font-extrabold">{country?.name.official}</h1>
      <ul>
        <li className="mb-2">
          <span className="font-semibold">Native Name: </span>
          {country?.name.official}
        </li>
        <li className="mb-2">
          <span className="font-semibold">Population: </span>
          {country?.population}
        </li>
        <li className="mb-2">
          <span className="font-semibold">Region: </span>
          {country?.region}
        </li>
        <li className="mb-2">
          <span className="font-semibold">Sub Region: </span>
          {country?.subregion}
        </li>
        <li className="mb-2">
          <span className="font-semibold">Capital: </span>
          {country?.capital}
        </li>
        <li className="mb-1 mt-10">
          <span className="font-semibold">Top Level Domain: </span>
          {country?.borders.map(
            (tld, index) =>
              `${tld}${index !== country.tld.length - 1 ? "" : ", "}`
          )}
        </li>
        {country?.currencies && (
          <li className="mb-2">
            <span className="font-semibold">Currencies: </span>
            {Object.keys(country?.currencies).map((currencyCode) => (
              <span key={currencyCode}>
                {country.currencies[currencyCode].name}
              </span>
            ))}
          </li>
        )}
        {country?.languages && (
          <li className="mb-2">
            <span className="font-semibold">Languages: </span>
            {Object.keys(country?.languages).map((language) => (
              <span key={language}>{country.languages[language]}</span>
            ))}
          </li>
        )}
      </ul>
      {country?.borders && (
        <>
          <h2 className="my-4 text-lg font-semibold">Border Countries:</h2>
          <div className="flex gap-2">
            {country?.borders.map((border, key) => (
              <div
                className="gap-2 px shadow-my transition-shadow hover:shadow-lg border border-my-lm-very-light-gray rounded-md px-6 py-1 text-sm"
                key={key}
              >
                {border}
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
};

export default CountryView;
