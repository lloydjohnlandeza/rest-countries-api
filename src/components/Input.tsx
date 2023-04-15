import React from "react";
import IconSearch from "./IconSearch";

interface InputProps {
  type?: string;
  placeholder: string;
  value?: string | number;
  defaultValue?: string | number;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  type = "text",
  placeholder = "",
  className = "",
  onChange,
  ...props
}: InputProps) {
  return (
    <div
      className={`flex items-center shadow-md border border-my-lm-very-light-gray rounded-md px-8 py-4 gap-8 focus-within:shadow-2xl transition-shadow dark:bg-my-dm-dark-blue dark:border-my-dm-dark-blue ${className}`}
    >
      <div>
        <IconSearch className="dark:text-my-white dark:opacity-100 text-my-lm-dark-gray opacity-40 scale-125" />
      </div>
      <input
        {...props}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        className="dark:bg-my-dm-dark-blue dark:placeholder:text-my-white bg-my-lm-very-light-gray border-none h-full w-full outline-none placeholder:font-extralight placeholder:text-my-lm-dark-gray placeholder:opacity-40 dark:placeholder:100"
      />
    </div>
  );
}
