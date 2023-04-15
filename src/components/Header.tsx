import IconMoon from "./IconMoon";
import React from "react";
import Link from "next/link";
interface HeaderProps {
  toggleDarkMode: () => void;
}
const Header: React.FC<HeaderProps> = ({ toggleDarkMode }) => {
  return (
    <div className="dark:bg-my-dm-dark-blue sticky mb-8 shadow-md">
      <div className="max-w-7xl px-4 py-6 flex justify-between m-auto">
        <Link href={"/"} className="text-sm font-extrabold ">
          Where in the world?
        </Link>
        <div>
          <button onClick={toggleDarkMode} className="flex items-center gap-2">
            <IconMoon />
            <span className="text-xs font-semibold">Dark Mode</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Header;
