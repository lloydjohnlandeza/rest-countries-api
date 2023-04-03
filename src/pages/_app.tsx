import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/components/Header";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-my-lm-very-light-gray text-my-dm-very-dark-blue pb-10">
      <Header />
      <Component {...pageProps} />
    </div>
  );
}
