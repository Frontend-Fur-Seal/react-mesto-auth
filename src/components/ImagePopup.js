function ImagePopup(props) {
  return (
    <section
      className={`popup popup_full-img ${
        props.card.link ? "popup_opened" : ""
      }`}
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
