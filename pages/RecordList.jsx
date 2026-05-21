import { useCallback, useState, useMemo } from "react";
import { useGlobal } from "../context/GlobalContext";
import { category } from "../data/category";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../components/Modal";

//Pagina lista di records

export default function RecordList() {
  const { records, compareIds, setCompareIds, favoritesIds, setFavoritesIds } =
    useGlobal();
  const [queryFilter, setQueryFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Tutti i generi");
  const [sortOrder, setSortOrder] = useState("none");

  const navigate = useNavigate();

  const preview = records.filter((r) => compareIds.includes(r.id));

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
    let result = [...records];
    //Filtro ricerca per titolo
    result = result.filter((r) =>
      r.title.toLowerCase().includes(queryFilter.toLowerCase()),
    );

    //Filtro ricerca per categoria
    result =
      categoryFilter === "Tutti i generi"
        ? result
        : result.filter((r) => r.category === categoryFilter.toLowerCase());

    //Ordinamento alfabetico
    if (sortOrder === "az") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sortOrder === "za") {
      result.sort((a, b) => b.title.localeCompare(a.title));
    }
    return result;
  }, [records, queryFilter, categoryFilter, sortOrder]);

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
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {category.map((c, index) => (
              <option key={index} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/*Ordinamento alfabetico */}
      <div>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="none">Nessun ordine</option>
          <option value="az">A-Z</option>
          <option value="za">Z-A</option>
        </select>
      </div>

      {/*Lista di records filtrata */}
      <ul>
        {filteredRecords.map((r) => {
          return (
            <div key={r.id}>
              <Link to={`/details/${r.id}`}>
                <li>
                  <h1>{r.title}</h1>
                  <strong>{r.category}</strong>
                </li>
              </Link>

              {/*Aggiunta a confronto records */}
              <button
                onClick={(e) =>
                  setCompareIds((prev) =>
                    prev.includes(r.id) ? prev : [...prev, r.id],
                  )
                }
              >
                Aggiungi al confronto
              </button>

              {/*Aggiunta ai preferiti */}

              <button
                onClick={() =>
                  setFavoritesIds((prev) =>
                    prev.includes(r.id)
                      ? prev.filter((id) => id !== r.id)
                      : [...prev, r.id],
                  )
                }
              >
                {favoritesIds.includes(r.id) ? "♥" : "♡"}
              </button>
            </div>
          );
        })}
      </ul>

      {/*Modale confronto records*/}

      <Modal
        title={"Prodotti da confrontare"}
        content={preview}
        show={compareIds.length > 0}
        onClose={() => setCompareIds([])}
        onConfirm={() => navigate("/compare")}
        confirmText={"Confronta"}
      />
    </section>
  );
}
