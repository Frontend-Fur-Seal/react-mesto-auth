import Popup from "./Popup";

function PopupWithForm({
  isOpen,
  onClose,
  name,
  title,
  children,
  buttonText,
  handleSubmit,
}) {
  return (
    <Popup
    isOpen={isOpen}
    onClose={onClose}
    name={name}
    >
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" onSubmit={handleSubmit}>
          {children}
          <button type="submit" className="popup__submit">
            {buttonText}
          </button>
        </form>
    </Popup>
  );
}

export default PopupWithForm;
