import React from "react";
import { AppContext } from "../contexts/AppContext";
export function useAppContext() {
  const { useContext } = React;
  return useContext(AppContext);
}
