import PopupWithForm from "./PopupWithForm";
import React, { useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function EditProfilePopup(props) {
  const [name, setNewName] = useState("");
  const [description, setNewDescription] = useState("");

  function handleChangeName(e) {
    setNewName(e.target.value);
  }

  function handleChangeDescription(e) {
    setNewDescription(e.target.value);
  }

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setNewName(currentUser.name);
    setNewDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      handleSubmit={handleSubmit}
      title="Редактировать профиль"
      buttonText={"Сохранить"}
    >
      <div className="popup__input-wrap">
        <input
          required=""
          minLength={2}
          maxLength={40}
          type="text"
          className="popup__input popup__content popup__content_type_name"
          name="popup__content_type_name"
          id="name-input"
          onChange={handleChangeName}
          value={name || ""}
        />
        <span className="popup__message-error name-input-error" />
      </div>
      <div className="popup__input-wrap">
        <input
          required=""
          minLength={2}
          maxLength={200}
          type="text"
          className="popup__input popup__content popup__content_type_occupation"
          name="popup__content_type_occupation"
          id="occupation-input"
          onChange={handleChangeDescription}
          value={description || ""}
        />
        <span className="popup__message-error occupation-input-error" />
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
