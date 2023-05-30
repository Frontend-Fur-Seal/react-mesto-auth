function Infotooltip({
    isOpen,
    onClose,
    resOk
  }) {
    return (
      <section className={`popup ${isOpen ? "popup_opened" : ""}`}>
        <div className="popup__container popup__container_infotool">
          <div className={`${resOk ? "popup__res-ok" : "popup__res-error"}`}></div>
          <h2 className="popup__title popup__title_infotool">{`${resOk ? 
            "Вы успешно зарегистрировались!" : 
            "Что-то пошло не так! Попробуйте ещё раз."}`
            }</h2>
          <button className="popup__close" type="reset" onClick={onClose} />
        </div>
      </section>
    );
  }
  
  export default Infotooltip;