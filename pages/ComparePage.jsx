import { useGlobal } from "../context/GlobalContext";
export default function ComparePage() {
  const { recordsToCompare } = useGlobal();
  if (!recordsToCompare.length) {
    return <p>Caricamento...</p>;
  }
  return (
    <section>
      {recordsToCompare.map((r) => (
        <div key={r.id}>
          <h1>{r.title}</h1>
          <p>{r.category}</p>
        </div>
      ))}
    </section>
  );
}
