import { useEffect } from "react";

function ImagePopup(props) {

  useEffect(() => {
    if (!props.card.link) return;
      const closeByEscape = (e) => {
    if (e.key === 'Escape') {
      props.onClose();
   }
  }
  document.addEventListener('keydown', closeByEscape)
  return () => document.removeEventListener('keydown', closeByEscape)
}, [props.isOpen, props.onClose])

 const handleOverlay = (e) => {
  if (e.target === e.currentTarget) {
    props.onClose();
  }
 }

  return (
    <section
      className={`popup popup_full-img ${
        props.card.link ? "popup_opened" : ""
      }`}
      onClick={handleOverlay}
    >
      <div className="popup__container popup__container_full-img">
        <figure className="popup__figure">
          <img
            className="popup__image"
            src={props.card.link}
            alt={props.card.name}
          />
          <figcaption className="popup__figcaption">
            {props.card.name}
          </figcaption>
        </figure>
        <button className="popup__close" type="reset" onClick={props.onClose} />
      </div>
    </section>
  );
}

export default ImagePopup;
