import PopupWithForm from "./PopupWithForm";
import React from "react";

function EditAvatarPopup(props) {
  const userAvatar = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: userAvatar.current.value,
    });
  }

  React.useEffect(() => {
    userAvatar.current.value = ''
  }, [props.isOpen]);

  return (
    <PopupWithForm
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText={"Сохранить"}
      handleSubmit={handleSubmit}
    >
      <div className="popup__input-wrap">
        <input
          required=""
          type="url"
          className="popup__input popup__content popup__content_type_avatar-link"
          placeholder="Ссылка на аватар"
          name="popupAvatarLink"
          id="avatar-link-input"
          defaultValue={""}
          ref={userAvatar}
        />
        <span className="popup__message-error avatar-link-input-error" />
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
