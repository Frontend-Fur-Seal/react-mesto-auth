import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;

  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);

  const cardLikeButtonClassName = `element__like ${
    isLiked && "element__like_active"
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <article className="element">
      <img
        className="element__photo"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleClick}
      />
      <div className="element__info">
        <h2 className="element__name">{props.card.name}</h2>
        <div className="element__containerLike">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <span className="element__likesQuantity">
            {props.card.likes.length}
          </span>
        </div>
      </div>
      {isOwn && (
        <button
          type="reset"
          className="element__delete"
          onClick={handleDeleteClick}
        ></button>
      )}
    </article>
  );
}

export default Card;
