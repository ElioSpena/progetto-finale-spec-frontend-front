import { useCallback, useState, useMemo } from "react";
import { useGlobal } from "../context/GlobalContext";
import { category } from "../data/category";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { MdCompareArrows } from "react-icons/md";
//Pagina lista di records

export default function RecordList() {
  const {
    records,
    compareIds,
    setCompareIds,
    favoritesIds,
    setFavoritesIds,
    detailRecord,
    getRecordsToCompare,
    compareDetail,
  } = useGlobal();

  const [queryFilter, setQueryFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Tutti i generi");
  const [sortOrder, setSortOrder] = useState("none");
  const [show, setShow] = useState(false);
  const [hover, setHover] = useState(false);

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
    <section className="container">
      <div className="filters-container">
        <div className="filters">
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
        </div>
      </div>

      {/*Counter records da confrontare*/}
      {compareIds.length > 0 && !show && (
        <div className="compare-float">
          <div>
            <h5>
              <span> Confronta {compareIds.length} Videogames!</span>
            </h5>
          </div>
          <div className="btn-compare">
            {compareIds.length > 1 && (
              <button
                onClick={() => {
                  getRecordsToCompare(compareIds);
                  setCompareIds([]);
                  setShow(true);
                }}
              >
                Confronta
              </button>
            )}

            <button
              onClick={() => {
                setCompareIds([]);
                setShow(false);
              }}
            >
              Annulla
            </button>
          </div>
        </div>
      )}

      {/*Lista di records filtrata */}
      <ul className="list">
        {filteredRecords.length === 0 ? (
          <p className="advise">Nessun risultato trovato!</p>
        ) : (
          filteredRecords.map((r) => {
            return (
              <li className="list-item" key={r.id}>
                <Link to={`/details/${r.id}`} className="list-main">
                  <h3>{r.title}</h3>
                  <span>{r.category}</span>
                </Link>

                <div className="list-actions">
                  {/* BOTTONE CONFRONTO */}
                  <button
                    onMouseEnter={() => setHover(r.id)}
                    onMouseLeave={() => setHover(null)}
                    onClick={() =>
                      setCompareIds((prev) =>
                        prev.includes(r.id) ? prev : [...prev, r.id],
                      )
                    }
                  >
                    <MdCompareArrows />
                    {hover === r.id && (
                      <span className="tooltip">Aggiungi al confronto</span>
                    )}
                  </button>

                  {/* BOTTONE PREFERITI */}
                  <button
                    onClick={() => {
                      const isFavorite = favoritesIds.includes(r.id);

                      const newFavorites = isFavorite
                        ? favoritesIds.filter((id) => id !== r.id)
                        : [...favoritesIds, r.id];

                      setFavoritesIds(newFavorites);
                    }}
                  >
                    {favoritesIds.includes(r.id) ? (
                      <FcLike />
                    ) : (
                      <FcLikePlaceholder />
                    )}
                  </button>
                </div>
              </li>
            );
          })
        )}
      </ul>

      {/*Modale confronto records*/}

      <Modal
        title={"Videogiochi a confronto!"}
        content={compareDetail}
        show={show}
        onClose={() => setShow(false)}
      />
    </section>
  );
}
