import { createContext, ReactNode, useState, useEffect } from "react";

export const AppContext = createContext({});

export function AppContextProvider(props) {
  const [dataApp, setDataApp] = useState({
    numberIssue: -1,
    numberPage: -1,
    filter: "",
    criteria: "",
  });

  return (
    <AppContext.Provider value={{ dataApp, setDataApp }}>
      {props.children}
    </AppContext.Provider>
  );
}
