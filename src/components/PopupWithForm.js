function PopupWithForm({
  isOpen,
  title,
  onClose,
  children,
  buttonText,
  handleSubmit,
}) {
  return (
    <section className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" onSubmit={handleSubmit}>
          {children}
          <button type="submit" className="popup__submit">
            {buttonText}
          </button>
        </form>
        <button className="popup__close" type="reset" onClick={onClose} />
      </div>
    </section>
  );
}

export default PopupWithForm;
