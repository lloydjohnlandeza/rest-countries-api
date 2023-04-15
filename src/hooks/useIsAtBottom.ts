import { useEffect, useState, RefObject } from "react";

function useIsAtBottom(ref: RefObject<HTMLDivElement> | null, threshold = 500) {
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const checkIfAtBottom = () => {
      if (!ref) return;
      const element = ref.current;
      if (element) {
        setIsAtBottom(
          element.getBoundingClientRect().bottom <=
            window.innerHeight + threshold
        );
      }
    };
    checkIfAtBottom();
    window.addEventListener("resize", checkIfAtBottom);
    window.addEventListener("scroll", checkIfAtBottom);
    return () => {
      window.removeEventListener("resize", checkIfAtBottom);
      window.removeEventListener("scroll", checkIfAtBottom);
    };
  }, [ref, threshold]);

  return isAtBottom;
}

export default useIsAtBottom;
