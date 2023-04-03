import React, { useState, useRef } from "react";
import { Country } from "@/types/country";
import Link from "next/link";
import Image from "next/image";
interface DropdownProps {
  country: Country;
  className?: string;
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
const CountryCard: React.FC<DropdownProps> = ({ country, className = "" }) => {
  // const [isOpen, setIsOpen] = useState(false);
  let countryName = encodeURI(country.name.official.toLowerCase());

  return (
    <Link
      className={`flex shadow-my rounded-md max-w-[250px] mx-auto overflow-hidden ${className}`}
      href={`/country/${countryName}`}
    >
      <article className="w-full">
        <Image
          className="w-full h-40 object-cover"
          src={country.flags.png}
          alt={country.flags.alt}
          width={256}
          height={256}
        />
        <div className="px-5 py-6">
          <h3 className="text-lg font-extrabold mb-3">
            {country.name.official}
          </h3>
          <ul>
            {displayProperties.map(({ label, property }, key) => (
              <li className="text-sm mb-2" key={key}>
                <span className="font-extrabold pr-1">{label}</span>
                <span>{country[property]}</span>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </Link>
  );
};

export default CountryCard;
