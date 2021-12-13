import React from "react";

export default function useKey(key, cb) {
  const { useRef, useEffect } = React;

  const callbackRef = useRef(cb);

  useEffect(() => {
    console.log("UseKEY");
    callbackRef.current = cb;
  });

  useEffect(() => {
    function handle(event) {
      if (event.code === key) {
        callbackRef.current(event);
      }
    }
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [key]);
}
