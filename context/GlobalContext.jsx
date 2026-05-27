import { createContext, useContext } from "react";
import useRecords from "../hooks/useRecords";

const GlobalContext = createContext();

function GlobalProvider({ children }) {
  const recordsData = useRecords();

  return (
    <GlobalContext.Provider value={recordsData}>
      {children}
    </GlobalContext.Provider>
  );
}

function useGlobal() {
  return useContext(GlobalContext);
}

export { GlobalProvider, useGlobal };
