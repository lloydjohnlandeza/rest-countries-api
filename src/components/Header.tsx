import React from "react";
import IconMoon from "./IconMoon";
export default function Header() {
  return (
    <div className="sticky mb-8 px-4 py-6 shadow-md flex justify-between">
      <h3 className="text-sm font-extrabold ">Where in the world?</h3>
      <div>
        <button className="flex items-center gap-2">
          <IconMoon />
          <span className="text-xs font-semibold">Dark Mode</span>
        </button>
      </div>
    </div>
  );
}
