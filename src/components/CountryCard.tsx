import React, { useState, useRef, CSSProperties } from "react";
import { Country } from "@/types/country";
import Link from "next/link";
import Image from "next/image";
import { Transition, TransitionStatus } from "react-transition-group";

type TransitionClass = {
  [key in TransitionStatus]?: string;
};

const transitionClass: TransitionClass = {
  entering: "opacity-0",
  entered: "opacity-1",
  exiting: "opacity-0",
  exited: "opacity-0",
};
interface DropdownProps {
  country: Country;
  className?: string;
  style?: CSSProperties;
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
}) => {
  // const [isOpen, setIsOpen] = useState(false);
  let countryName =
    country && country.name
      ? encodeURI(country.name.official.toLowerCase())
      : "/";

  return (
    <Transition appear timeout={150} in>
      {(state) => {
        return (
          <Link
            style={style}
            className={`flex shadow-my w-[280px] rounded-md mx-auto overflow-hidden transition-all ${transitionClass[state]}`}
            href={`/country/${countryName}`}
          >
            <article className="w-full">
              <div className="h-40 w-full relative aspect-square">
                {country && country.flags && (
                  <Image
                    className="w-full object-cover"
                    src={country.flags.png}
                    alt={country.flags.alt}
                    sizes="@media not all and (min-width: 768px) 80vw,
                @media not all and (min-width: 1280px) 50vw,
                33vw"
                    fill
                  />
                )}
              </div>
              <div className="px-5 py-6">
                <h3 className="text-lg font-extrabold mb-3">
                  {country?.name?.official}
                </h3>
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
      }}
    </Transition>
  );
};

export default CountryCard;
