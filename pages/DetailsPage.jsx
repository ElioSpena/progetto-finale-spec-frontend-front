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

  return (
    <section className="detail-container">
      <article>
        {/*Card Header*/}
        <div className="details-header">
          <h1>{detailRecord.title}</h1>

          <div className="details-tags">
            <span>{detailRecord.platform}</span>
            <span>{detailRecord.genre}</span>
          </div>
        </div>

        {/*Contenuto*/}
        <div className="details-content">
          <div className="details-image">
            <img src={detailRecord.image} alt={detailRecord.title} />
          </div>
          {/*Descrizione*/}
          <div className="details-section">
            <div>
              <strong>Descrizione</strong>
              <p>{detailRecord.description}</p>
            </div>

            <div>
              <strong>Casa di sviluppo</strong>
              <p>{detailRecord.developer}</p>
            </div>

            {/*Informazioni sull'acquisto */}

            <p
              className={
                detailRecord.isAvailable ? "available" : "not-available"
              }
            >
              {detailRecord.isAvailable
                ? "Disponibile per l'acquisto"
                : "Non disponibile per l'acquisto"}
            </p>

            <p className="used-status">
              {detailRecord.isUsed
                ? "Usato Disponibile"
                : "Usato non disponibile"}
            </p>

            <div className="details-grid">
              <div className="details-box">
                <strong>Voto</strong>
                <p>{detailRecord.rating}/10</p>
              </div>

              <div className="details-box">
                <strong>Prezzo</strong>
                <p>€ {detailRecord.price}</p>
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
