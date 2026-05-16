import { useCallback, useState, useMemo } from "react";
import { useGlobal } from "../context/GlobalContext";
import { category } from "../utilities/category";

//Pagina lista di records

export default function RecordList() {
  const { records } = useGlobal();
  const [query, setQuery] = useState("");

  //Debounce dell'input per ritardare aggiornamento query
  function debounce(callback, delay) {
    let timer;
    return (value) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        callback(value);
      }, delay);
    };
  }

  const delayQuery = useCallback(
    debounce((value) => {
      setQuery(value);
    }, 1000),
    [],
  );

  //Filtri records

  const filteredRecords = useMemo(() => {
    //Filtro ricerca per titolo
    let queryFiltered = [...records].filter((r) =>
      r.title.toLowerCase().includes(query.toLowerCase()),
    );

    return queryFiltered;
  }, [records, query]);

  return (
    <section>
      <div>
        {/*Barra di ricerca per titolo*/}
        <div>
          <input
            onChange={(e) => delayQuery(e.target.value)}
            type="text"
            placeholder="Cerca per titolo..."
          />
        </div>

        {/*Filtro per categoria */}
        <div>
          <select name="" id="">
            {category.map((c, index) => (
              <option key={index} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/*Lista di records filtrata */}
      <ul>
        {filteredRecords.map((r) => {
          return (
            <li key={r.id}>
              <h1>{r.title}</h1>
              <strong>{r.category}</strong>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
