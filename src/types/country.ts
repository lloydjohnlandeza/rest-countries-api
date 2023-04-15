export interface Country {
  name?: {
    common: string;
    official: string;
    nativeName: {
      eng: {
        official: string;
      };
    };
  };
  tld?: Array<string>;
  capital?: string;
  region?: string;
  subregion?: string;
  borders?: string[];
  population?: number;
  languages?: {
    [key: string]: string;
  };
  flags?: {
    png: string;
    svg: string;
    alt: string;
  };
  currencies?: {
    [currencyCode: string]: {
      name: string;
      symbol: string;
    };
  };
}
