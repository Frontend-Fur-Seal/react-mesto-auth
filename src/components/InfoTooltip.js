import Popup from "./Popup";

function Infotooltip({
    isOpen,
    onClose,
    resOk,
    name
  }) {
    return (
      <Popup
      isOpen = {isOpen}
      onClose = {onClose}
      name = {name}
      >
          <div className={`${resOk ? "popup__res-ok" : "popup__res-error"}`}></div>
          <h2 className="popup__title popup__title_infotool">{`${resOk ? 
            "Вы успешно зарегистрировались!" : 
            "Что-то пошло не так! Попробуйте ещё раз."}`
            }</h2>
      </Popup>
    );
  }
  
  export default Infotooltip;