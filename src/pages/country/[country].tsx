import React, { useEffect, useState } from "react";
import IconLeft from "@/components/IconLeft";
import { Country } from "@/types/country";
import Link from "next/link";
import {
  findCountry,
  getCountries,
  useFindCountryByFullName,
} from "@/api/country";
import Image from "next/image";
import { useRouter } from "next/router";
import Head from "next/head";

const CountryView = ({ initialData }: { initialData: Country[] }) => {
  const router = useRouter();
  const { country, isLoading, isError } = useFindCountryByFullName({
    name: router.query.country as string,
    initialData,
  });
  const tlds = country?.tld ?? [];
  const currencies = country?.currencies ?? {};
  const languages = country?.languages ?? {};
  const name = country?.name?.common;

  const [borderOfficialNames, setBorderOfficialNames] = useState<string[]>([]);

  useEffect(() => {
    if (country.borders?.length) {
      const getCountryNameByBorders = [] as Array<Promise<string>>;
      country.borders.forEach((border) => {
        getCountryNameByBorders.push(
          findCountry(border, "name", false).then(
            (res: { name: { official: string } }) => {
              return res.name.official;
            }
          )
        );
      });

      Promise.all(getCountryNameByBorders).then((values) => {
        setBorderOfficialNames(values);
      });
    }
  }, [country.borders]);

  if (isLoading) {
    return <div className="max-w-7xl mx-auto px-5">loading</div>;
  }
  return (
    <>
      <Head>
        <title>{name}</title>
        <meta property="og:title" content={`Country ${name}`} key="title" />
      </Head>
      <main className="max-w-7xl mx-auto px-5 pb-5">
        <Link
          className="inline-flex items-center gap-2 px shadow-lg transition-shadow hover:shadow-lg dark:hover:shadow-2xl border border-my-lm-very-light-gray rounded-sm px-6 py-1 text-sm bg-my-white dark:bg-my-dm-dark-blue dark:border-my-dm-dark-blue"
          href="/"
        >
          <IconLeft /> Back
        </Link>
        <div className="grid items-center gap-10 mt-10 xl:grid-cols-[1fr_1fr] lg:grid-cols-[1.5fr_1fr] 2xl:gap-32 lg:gap-20 md:gap-8">
          <div className="aspect-[13/9] relative">
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
          </div>
          <div className="md:grid md:grid-cols-2">
            <h1 className="mb-6 text-2xl font-extrabold md:col-span-2">
              {country?.name?.common}
            </h1>
            <ul className="xl:col-span-1 md:col-span-2">
              <li className="mb-2">
                <span className="font-semibold">Native Name: </span>
                {country?.name?.official}
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
            </ul>
            <ul className="mt-10 xl:col-span-1 md:col-span-2 lg:mt-0">
              <li className="mb-2">
                <span className="font-semibold">Top Level Domain: </span>
                {tlds.map(
                  (tld, index) =>
                    `${tld}${index === tlds.length - 1 ? "" : ", "}`
                )}
              </li>
              <li className="mb-2">
                <span className="font-semibold">Currencies: </span>
                {Object.keys(currencies).map((currencyCode, index) => (
                  <span key={currencyCode}>
                    {currencies[currencyCode].name}
                    {`${
                      index === Object.keys(currencies).length - 1 ? "" : ", "
                    }`}
                  </span>
                ))}
              </li>
              <li className="mb-2">
                <span className="font-semibold">Languages: </span>
                {Object.keys(languages).map((language, index) => (
                  <span key={language}>
                    {languages[language]}

                    {`${
                      index === Object.keys(languages).length - 1 ? "" : ", "
                    }`}
                  </span>
                ))}
              </li>
            </ul>
            {borderOfficialNames.length > 0 && (
              <>
                <h2 className="my-4 text-lg font-semibold md:col-span-2">
                  Border Countries:
                </h2>
                <div className="flex gap-2 flex-wrap md:col-span-2">
                  {borderOfficialNames.map((border, key) => (
                    <Link
                      className="gap-2 px dark:shadow-lg shadow-my transition-shadow dark:hover:shadow-2xl hover:shadow-lg border border-my-lm-very-light-gray rounded-sm px-6 py-1 text-sm dark:border-my-dm-dark-blue dark:bg-my-dm-dark-blue"
                      key={key}
                      href={`/country/${border.toLowerCase()}`}
                    >
                      {border}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export async function getStaticPaths() {
  const countries = await getCountries("name");
  const paths = [] as Array<{ params: { country: string } }>;
  countries.map((country: { name: { official: string } }) => {
    if (country?.name?.official) {
      paths.push({
        params: {
          country: country.name.official.toLowerCase(),
        },
      });
    }
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: {
  params: { country: string };
}) {
  const country = await findCountry(params.country);
  return { props: { initialData: country } };
}

export default CountryView;
