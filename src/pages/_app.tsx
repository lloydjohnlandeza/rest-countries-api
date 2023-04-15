import React, { useState, useEffect } from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/components/Header";

export default function App({ Component, pageProps }: AppProps) {
  const [isDarkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDarkModeLocal = !!window.localStorage.getItem("dark");
    setDarkMode(isDarkModeLocal);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const html = document?.querySelector("html") ?? false;
    if (!html) return;
    if (isDarkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleToggleDarkMode = () => {
    if (!isDarkMode) {
      window.localStorage.setItem("dark", "true");
    } else {
      window.localStorage.removeItem("dark");
    }
    setDarkMode(!isDarkMode);
  };
  return (
    <div
      className={`min-h-screen dark:bg-my-dm-very-dark-blue bg-my-lm-very-light-gray text-my-dm-very-dark-blue dark:text-my-white`}
    >
      <Header toggleDarkMode={handleToggleDarkMode} />
      <Component {...pageProps} />
    </div>
  );
}
