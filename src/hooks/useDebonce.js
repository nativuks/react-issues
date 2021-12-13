import React, { useRef } from "react";

export default function useDebounce(fn, delay) {
  const timeoutref = useRef(null);

  function debouncedFn(...args) {
    window.clearTimeout(timeoutref.current);
    timeoutref.current = setTimeout(() => {
      fn(...args);
    }, delay);
  }

  return debouncedFn;
}
