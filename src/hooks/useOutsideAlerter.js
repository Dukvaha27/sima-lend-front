import React, { useEffect } from "react";

const useOutSideAlerter = (ref, handler) => {
  useEffect(() => {
    function handleClick(event) {
      if (!ref.current.contains(event.target)) {
        handler();
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref, handler]);
};

export default useOutSideAlerter;
