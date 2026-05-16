import { useGlobal } from "../context/GlobalContext";

//Pagina lista di records

export default function RecordList() {
  const { records } = useGlobal();

  return (
    <section>
      <ul>
        {records.map((r) => {
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
