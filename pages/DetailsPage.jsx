import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGlobal } from "../context/GlobalContext";

export default function DetailsPage() {
  const { id } = useParams();
  const { getRecordDetails, detailRecord } = useGlobal();

  //Fetch al cambio di id

  useEffect(() => {
    getRecordDetails(id);
  }, [id]);

  if (!detailRecord) {
    return <p>Caricamento...</p>;
  }
  console.log(detailRecord);

  return (
    <section>
      <article>
        {/*Header*/}
        <header>
          <h1>{detailRecord.title}</h1>
          <span>{detailRecord.category}</span>
          <span>{detailRecord.platform}</span>
        </header>

        {/*Descrizione*/}
        <p>
          <strong>Descrizione: </strong>
          {detailRecord.description}
        </p>
        <p>
          <strong>Casa di sviluppo: </strong>
          {detailRecord.developer}
        </p>
        <p>
          <strong>Genere: </strong>
          {detailRecord.genre}
        </p>

        <p>
          <strong>Voto: </strong>
          {detailRecord.rating}/10
        </p>

        {/*Informazioni sull'acquisto */}

        <p>
          <strong> Disponibilità: </strong>
          {detailRecord.isAvailable
            ? `Disponibili: ${detailRecord.availableQuantity}`
            : "Non disponibile"}
        </p>

        <p>
          <strong>Prezzo: </strong>
          {detailRecord.price}
        </p>

        <strong>
          {detailRecord.isUsed ? "Disponibile Usato" : "Usato non disponibile"}
        </strong>
      </article>
    </section>
  );
}
