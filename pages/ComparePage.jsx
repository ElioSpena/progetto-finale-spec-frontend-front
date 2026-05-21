import { useGlobal } from "../context/GlobalContext";
export default function ComparePage() {
  const { records, compareIds } = useGlobal();

  const listToCompare = records.filter((r) => compareIds.includes(r.id));

  if (!listToCompare) {
    return <p>Caricamento...</p>;
  }
  return (
    <section>
      {listToCompare.map((r) => (
        <div key={r.id}>
          <h1>{r.title}</h1>
          <p>{r.category}</p>
        </div>
      ))}
    </section>
  );
}
