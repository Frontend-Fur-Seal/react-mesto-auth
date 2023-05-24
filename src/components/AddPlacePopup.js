import PopupWithForm from "./PopupWithForm";
import React, { useState } from "react";

function AddPlacePopup(props) {
  const [name, setNewName] = useState('');
  const [link, setNewLink] = useState('');

  React.useEffect(() => {
    setNewName('')
    setNewLink('')
  }, [props.isOpen]);

  function handleChangeName(e) {
    setNewName(e.target.value);
  }

  function handleChangeLink(e) {
    setNewLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onLoadedPlace({
      name,
      link,
    });
  }

  return (
    <PopupWithForm
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText={"Создать"}
      handleSubmit={handleSubmit}
    >
      <div className="popup__input-wrap">
        <input
          required=""
          minLength={2}
          maxLength={30}
          type="text"
          className="popup__input popup__content popup__content_type_name-place"
          name="popupPlaceName"
          placeholder="Название"
          id="name-place-input"
          onChange={handleChangeName}
          value={name || ''}
        />
        <span className="popup__message-error name-place-input-error" />
      </div>
      <div className="popup__input-wrap">
        <input
          required=""
          type="url"
          className="popup__input popup__content popup__content_type_link"
          name="popupPlaceLink"
          placeholder="Ссылка на картинку"
          id="link-input"
          onChange={handleChangeLink}
          value={link || ''}
        />
        <span className="popup__message-error link-input-error" />
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
