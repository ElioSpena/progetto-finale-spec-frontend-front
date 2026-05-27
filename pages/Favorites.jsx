import { Link } from "react-router-dom";
import { useGlobal } from "../context/GlobalContext";
import { useEffect } from "react";
import { SlGameController } from "react-icons/sl";
import { CiCircleRemove } from "react-icons/ci";

//Pagina dei preferiti

export default function Favorites() {
  const { favoritesIds, getFavouritesRecords, setFavoritesIds, favorites } =
    useGlobal();

  useEffect(() => {
    if (favoritesIds.length > 0) {
      getFavouritesRecords(favoritesIds);
    }
  }, [favoritesIds]);

  return (
    <>
      <header>
        <Link to="/">
          <SlGameController className="logo" />
        </Link>
      </header>
      {favoritesIds.length === 0 && (
        <h1 className="advise">
          Non hai ancora salvato nessun gioco nei preferiti.
        </h1>
      )}

      <section className="container favorites-page">
        <ul className="list">
          {favorites.map((f) => (
            <li key={f.id} className="list-item">
              {/* INFO GIOCO */}
              <Link to={`/details/${f.id}`} className="list-main">
                <div className="favorite-image">
                  <img src={f.image} alt={f.title} />
                </div>

                <div className="favorite-content">
                  <h3>{f.title}</h3>

                  <div className="favorite-badges">
                    <span>{f.genre}</span>
                    <span>{f.platform}</span>
                  </div>
                </div>
              </Link>

              <div className="list-actions">
                {/* RIMUOVI DAI PREFERITI */}
                <button
                  onClick={() =>
                    setFavoritesIds((prev) => prev.filter((id) => id !== f.id))
                  }
                >
                  <CiCircleRemove className="btn-delete" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
