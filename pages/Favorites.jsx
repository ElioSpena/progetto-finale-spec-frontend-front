import { useGlobal } from "../context/GlobalContext";

//Pagina dei preferiti

export default function Favorites() {
  const { favoritesIds, records } = useGlobal();

  const favoritesList = records.filter((r) => favoritesIds.includes(r.id));

  return (
    <section>
      {favoritesList.map((f) => (
        <h1>{f.title}</h1>
      ))}
    </section>
  );
}
