import { createPortal } from "react-dom";

export default function Modal({
  title,
  content,
  show,
  onClose,
  onConfirm,
  confirmText,
}) {
  const modalRoot = document.getElementById("modal");

  return (
    show &&
    createPortal(
      <>
        <div>
          <h3>{title}</h3>
          {content.map((r) => (
            <div key={r.id}>
              <h3>{r.title}</h3>
              <p>{r.category}</p>
            </div>
          ))}
          <div>
            <button onClick={onClose}>Annulla</button>
            <button onClick={onConfirm}>{confirmText}</button>
          </div>
        </div>
      </>,
      document.body,
    )
  );
}
