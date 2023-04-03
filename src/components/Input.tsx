import React from "react";
import IconSearch from "./IconSearch";

interface InputProps {
  type?: string;
  placeholder: string;
  value?: string | number;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  type = "text",
  placeholder = "",
  // value = "",
  className = "",
  onChange,
}: InputProps) {
  return (
    <div
      className={`flex items-center shadow-md border border-my-lm-very-light-gray rounded-md px-8 py-4 gap-8 focus-within:shadow-2xl transition-all ${className}`}
    >
      <div>
        <IconSearch className="text-my-lm-dark-gray opacity-40 scale-125" />
      </div>
      <input
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        // value={value}
        className="bg-my-lm-very-light-gray border-none h-full w-full outline-none placeholder:font-extralight placeholder:text-my-lm-dark-gray placeholder:opacity-40"
      />
    </div>
  );
}
