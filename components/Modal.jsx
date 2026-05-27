import { createPortal } from "react-dom";

export default function Modal({ title, content, show, onClose }) {
  if (!show) return null;

  const fields = [
    { label: "Genere", key: "genre" },
    { label: "Voto", key: "rating", suffix: "/10" },
    { label: "Prezzo", key: "price", prefix: "€ " },
  ];

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          <table className="compare-table">
            {/* GIOCHI*/}
            <thead>
              <tr>
                <th></th>
                {content.map((r) => (
                  <th key={r.id}>{r.title}</th>
                ))}
              </tr>
            </thead>

            {/*PROPRIETA' */}
            <tbody>
              {fields.map((field) => (
                <tr key={field.key}>
                  <th>{field.label}</th>

                  {content.map((r) => (
                    <td key={r.id + field.key}>
                      {field.prefix || ""}
                      {r[field.key]}
                      {field.suffix || ""}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>,
    document.body,
  );
}
