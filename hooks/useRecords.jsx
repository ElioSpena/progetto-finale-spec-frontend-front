import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGlobal } from "../context/GlobalContext";
import useStorage from "../hooks/useStorage";

//Import dell'url dal file .env
const url = import.meta.env.VITE_API_URL;

//Custom Hook per gestione records e chiamate API

export default function useRecords() {
  const [records, setRecords] = useState([]);
  const [detailRecord, setDetailRecord] = useState(null);
  const [compareDetail, setCompareDetail] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [favoritesIds, setFavoritesIds] = useStorage("favorites", []);
  const [compareIds, setCompareIds] = useState([]);

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

  //Fetch dettaglio record

  async function getRecordDetails(id) {
    try {
      const resp = await fetch(`${url}/videogames/${id}`);
      if (!resp.ok) {
        throw new Error("Errore durante il recupero del videogioco!");
      }
      const data = await resp.json();

      setDetailRecord(data.videogame);
      return data.videogame;
    } catch (err) {
      console.log(err.message);
    }
  }

  //Fetch Dettagli ArrayIds

  async function getRecordsToCompare(ids) {
    const results = await Promise.all(ids.map((id) => getRecordDetails(id)));
    setCompareDetail(results);
  }

  async function getFavouritesRecords(ids) {
    const results = await Promise.all(ids.map((id) => getRecordDetails(id)));
    setFavorites(results);
  }

  return {
    records,
    detailRecord,
    favorites,
    favoritesIds,
    compareIds,
    compareDetail,
    setFavoritesIds,
    setCompareIds,
    setFavorites,
    getRecordDetails,
    getRecordsToCompare,
    getFavouritesRecords,
  };
}
