import React, { useState, useRef, CSSProperties, useEffect } from "react";
import { Country } from "@/types/country";
import Link from "next/link";
import Image from "next/image";
import IconLeft from "./IconLeft";
import { motion } from "framer-motion";
import { useRouter } from 'next/router'

interface ISelectCountry extends Country {
  width: number
  height: number
  left: number
  top: number
}
interface DropdownProps {
  country?: ISelectCountry;
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
const CountryCardTransition: React.FC<DropdownProps> = ({
  country,
  className = "",
  style,
}) => {
  let countryName =
    country && country.name
      ? encodeURI(country.name.official.toLowerCase())
      : "/";
  const ref = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const [imageSize, setImageSize] = useState<{
    width: Number,
    height: Number,
    left: Number,
    top: Number
  } | null>(null)
  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setImageSize({
        width: ref.current.clientWidth,
        height: ref.current.clientHeight,
        left: rect.left,
        top: rect.top
      })
    }
  }, [ref]);
  return (
    <>
    <div className="relative">
      <div className="absolute top-0 left-0 right-0 max-w-7xl mx-auto px-5 pb-5">
        <Link
          className="inline-flex items-center gap-2 px shadow-lg transition-shadow hover:shadow-lg dark:hover:shadow-2xl border border-my-lm-very-light-gray rounded-sm px-6 py-1 text-sm bg-my-white dark:bg-my-dm-dark-blue dark:border-my-dm-dark-blue"
          href="/"
        >
          <IconLeft /> Back
        </Link>
        <div className="grid gap-10 mt-10 xl:grid-cols-[1fr_1fr] lg:grid-cols-[1.5fr_1fr] 2xl:gap-32 lg:gap-20 md:gap-8">
          <div ref={ref} className="aspect-[13/9] relative">
          </div>
        </div>
      </div>
    </div>
    {country &&
      <div className="fixed w-full h-full top-0">
        <motion.div
          className={`absolute`}
          initial={{
            width: country?.width + 'px',
            height: country?.height + 'px',
            left: country?.left + 'px',
            top: country?.top + 'px'
          }}
          animate={{
            width: `${imageSize?.width}px`,
            height: `${imageSize?.height}px`,
            left: `${imageSize?.left}px`,
            top: `${imageSize?.top}px`
          }}
          onAnimationComplete={() => {
            const redirect: { pathname: string, query?: { image: string }} = {
              pathname: `/country/${countryName}`,
            }
            if (country.flags?.svg) {
              redirect.query = {
                image: country.flags.svg
              }
            }
            router.push(redirect)
          }}
        >
          {country && country.flags && (
            <Image
              className="w-full"
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
        </motion.div>
      </div>
    }
    </>
  );
};

export default CountryCardTransition;
