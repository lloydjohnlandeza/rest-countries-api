import React, { useState, useRef } from "react";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { motion, Variants } from "framer-motion";
import IconCaretDown from "./IconCaretDown";

type Option = { value: string; label: string } | string;

interface DropdownProps<T> {
  className?: string;
  id: string;
  options: Array<T>;
  onChange: (option: T) => void;
}

const Dropdown = <T extends Option>({
  className = "",
  id,
  options = [],
  onChange,
}: DropdownProps<T>) => {
  const ref = useRef(null);

  const [isOpen, setIsOpen] = useState(false);

  useOnClickOutside(ref, () => setIsOpen(false));

  const handleItemClick = (option: T) => {
    onChange(option);
    setIsOpen(false);
  };

  const itemVariants: Variants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    closed: {
      opacity: 0,
      y: -10,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };
  return (
    <div ref={ref} className={`w-56 relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        aria-expanded={isOpen}
        aria-controls={id}
        className={`w-full text-sm flex justify-between ${
          isOpen ? "shadow-lg" : "dark:shadow-none shadow-my"
        }  hover:shadow-lg border dark:bg-my-dm-dark-blue dark:border-my-dm-dark-blue border-my-lm-very-light-gray rounded-md px-5 py-4`}
      >
        <span>Filter by Region</span>
        <IconCaretDown />
      </button>
      <motion.ul
        initial={false}
        animate={isOpen ? "open" : "closed"}
        className={`absolute z-10 dark:bg-my-dm-dark-blue bg-my-white top-16 text-sm w-full shadow-my border border-my-lm-very-light-gray rounded-md`}
        variants={{
          open: {
            height: "auto",
            border: "1px",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.3,
              delayChildren: 0.1,
              staggerChildren: 0.05,
            },
          },
          closed: {
            height: "0",
            border: "0",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.3,
              staggerDirection: -1,
              delay: 0.1,
            },
          },
        }}
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
      >
        {options.map((option, key) => (
          <motion.li variants={itemVariants} key={key}>
            <button
              onClick={() => handleItemClick(option)}
              className="px-5 py-2 w-full text-left hover:bg-my-lm-very-light-gray dark:hover:bg-my-dm-very-dark-blue"
            >
              {typeof option === "object" ? option.label : option}
            </button>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
};

export default Dropdown;
