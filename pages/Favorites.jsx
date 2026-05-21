import { useGlobal } from "../context/GlobalContext";

//Pagina dei preferiti

export default function Favorites() {
  const { favoritesIds, records } = useGlobal();

  const favoritesList = records.filter((r) => favoritesIds.includes(r.id));

  return (
    <section>
      <ul>
        {favoritesList.map((f) => (
          <li key={f.id}>
            <h1>{f.title}</h1>
          </li>
        ))}
      </ul>
    </section>
  );
}
