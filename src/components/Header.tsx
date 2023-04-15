import IconMoon from "./IconMoon";
import React from "react";
import Link from "next/link";
interface HeaderProps {
  toggleDarkMode: () => void;
}
const Header: React.FC<HeaderProps> = ({ toggleDarkMode }) => {
  return (
    <header className="dark:bg-my-dm-dark-blue bg-my-white sticky mb-8 shadow-md">
      <div className="max-w-7xl px-4 py-6 flex justify-between m-auto">
        <Link href={"/"} className="text-sm font-extrabold ">
          <h1>Where in the world?</h1>
        </Link>
        <div>
          <button onClick={toggleDarkMode} className="flex items-center gap-2">
            <IconMoon />
            <span className="text-xs font-semibold">Dark Mode</span>
          </button>
        </div>
      </div>
    </header>
  );
};
export default Header;
