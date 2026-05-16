import { useCallback, useState, useMemo } from "react";
import { useGlobal } from "../context/GlobalContext";
import { category } from "../utilities/category";

//Pagina lista di records

export default function RecordList() {
  const { records } = useGlobal();
  const [queryFilter, setQueryFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Tutti i generi");

  //Debounce dell'input per ritardare aggiornamento query
  function debounce(callback, delay) {
    let timer;
    return (value) => {
      clearTimeout(timer);
      timer = setTimeout(() => callback(value), delay);
    };
  }

  const delayQuery = useCallback(
    debounce((value) => {
      setQueryFilter(value);
    }, 1000),
    [],
  );

  //Filtri records

  const filteredRecords = useMemo(() => {
    //Filtro ricerca per titolo
    const queryFiltered = [...records].filter((r) =>
      r.title.toLowerCase().includes(queryFilter.toLowerCase()),
    );

    //Filtro ricerca per categoria
    const categoryFiltered =
      categoryFilter === "Tutti i generi"
        ? queryFiltered
        : queryFiltered.filter(
            (r) => r.category === categoryFilter.toLowerCase(),
          );

    return categoryFiltered;
  }, [records, queryFilter, categoryFilter]);

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
          <select onChange={(e) => setCategoryFilter(e.target.value)}>
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
