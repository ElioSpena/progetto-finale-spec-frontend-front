import { createContext, useContext, useState } from "react";
import useRecords from "../hooks/useRecords";
import useStorage from "../hooks/useStorage";
const GlobalContext = createContext();

function GlobalProvider({ children }) {
  const { records, detailRecord, getRecordDetails } = useRecords();
  const [favoritesIds, setFavoritesIds] = useStorage("favorites", []);
  const [compareIds, setCompareIds] = useState([]);

  console.log(favoritesIds);

  return (
    <GlobalContext.Provider
      value={{
        records,
        detailRecord,
        getRecordDetails,

        compareIds,
        setCompareIds,

        favoritesIds,
        setFavoritesIds,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

function useGlobal() {
  return useContext(GlobalContext);
}

export { GlobalProvider, useGlobal };
