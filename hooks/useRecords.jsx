import { useState, useEffect } from "react";

//Import dell'url dal file .env
const url = import.meta.env.VITE_API_URL;

//Custom Hook per gestione records e chiamate API

export default function useRecords() {
  const [records, setRecords] = useState([]);

  //Fetch lista dei records VideoGame

  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch(`${url}/videogames`);
        if (!resp.ok) {
          throw new Error("Errore durante il recupero dei videogiochi!");
        }
        const data = await resp.json();
        setRecords(data);
      } catch (err) {
        console.log(err.message);
      }
    })();
  }, []);

  return {
    records,
  };
}
