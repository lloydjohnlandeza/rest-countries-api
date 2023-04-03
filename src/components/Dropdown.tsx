import React, { useState, useRef } from "react";
import { Transition, TransitionStatus } from "react-transition-group";
import useOnClickOutside from "@/hooks/useOnClickOutside";

interface DropdownProps {
  className?: string;
  id: string;
  options: Array<{ value: string; label: string } | string>;
}

type TransitionClass = {
  [key in TransitionStatus]?: string;
};
const transitionClass: TransitionClass = {
  entering: "opacity-0 max-h-0 py-0 overflow-hidden",
  entered: "opacity-1 max-h-[500px] py-4 overflow-hidden",
  exiting: "opacity-0 max-h-0 py-0 overflow-hidden",
  exited: "opacity-0 max-h-0 py-0 overflow-hidden",
};
const Dropdown: React.FC<DropdownProps> = ({
  className = "",
  id,
  options = [],
}) => {
  const ref = useRef(null);

  const [isOpen, setIsOpen] = useState(false);

  useOnClickOutside(ref, () => setIsOpen(false));

  return (
    <div ref={ref} className={`w-56 relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        aria-expanded={isOpen}
        aria-controls={id}
        className={`w-full text-sm flex justify-between ${
          isOpen ? "shadow-lg" : "shadow-my"
        }  hover:shadow-lg border border-my-lm-very-light-gray rounded-md px-5 py-4`}
      >
        <span>Filter by Region</span>
        <span>.</span>
      </button>
      <Transition unmountOnExit in={isOpen} timeout={150}>
        {(state) => (
          <ul
            className={`absolute bg-my-white top-16 text-sm w-full shadow-my border border-my-lm-very-light-gray rounded-md transition-all ${transitionClass[state]}`}
            id={id}
          >
            {options.map((option, key) => (
              <li className="" key={key}>
                <button className="px-5 py-2 w-full text-left hover:bg-my-lm-very-light-gray">
                  {typeof option === "object" ? option.label : option}
                </button>
              </li>
            ))}
          </ul>
        )}
      </Transition>
    </div>
  );
};

export default Dropdown;
