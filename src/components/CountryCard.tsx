import React, { useState, useRef, CSSProperties, MutableRefObject } from "react";
import { Country } from "@/types/country";
import Link from "next/link";
import Image from "next/image";
import CountryCardTransition from "./CountryCardTransition";
interface DropdownProps {
  country: Country;
  className?: string;
  style?: CSSProperties;
  onClick: (country: Country, ref:  React.MutableRefObject<HTMLDivElement | null>) => void
}

const displayProperties = [
  {
    label: "Population:",
    property: "population" as "population",
  },
  {
    label: "Region:",
    property: "region" as "region",
  },
  {
    label: "Capital:",
    property: "capital" as "capital",
  },
];
const CountryCard: React.FC<DropdownProps> = ({
  country,
  className = "",
  style,
  onClick
}) => {
  let countryName =
    country && country.name
      ? encodeURI(country.name.official.toLowerCase())
      : "/";
  const ref = useRef(null)
  const redirect: { pathname: string, query?: { image: string }} = {
    pathname: `/country/${countryName}`,
  }
  if (country.flags?.svg) {
    redirect.query = {
      image: country.flags.svg
    }
  }
  return (
    <Link
      style={style}
      className={`flex h-full shadow-my dark:shadow-2xl hover:shadow-2xl transition-shadow w-[280px] rounded-md mx-auto overflow-hidden ${className}`}
      href={redirect}
      onClick={e => {
        e.preventDefault()
        onClick(country, ref)
      }}
    >
      <article className="w-full">
        <div ref={ref} className="h-40 w-full relative">
          {country && country.flags && (
            <Image
              className="w-full object-cover"
              src={country.flags.svg}
              alt={country.flags.alt}
              fill
              sizes="@media not all and (min-width: 768px) 80vw,
              @media not all and (min-width: 1280px) 50vw,
              33vw"
              placeholder="blur"
              blurDataURL="/spinner.svg"
            />
          )}
        </div>
        <div className="px-5 py-6">
          <h2 className="text-lg font-extrabold mb-3">
            {country?.name?.official}
          </h2>
          <ul>
            {displayProperties.map(({ label, property }, key) => (
              <li className="text-sm mb-2" key={key}>
                <span className="font-extrabold pr-1">{label}</span>
                <span>{country && country[property]}</span>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </Link>
  );
};

export default CountryCard;
