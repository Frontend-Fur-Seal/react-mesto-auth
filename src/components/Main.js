import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import hoverAvatar from "../images/Avatar.svg";
import Card from "./Card.js";
import { Link } from 'react-router-dom';
import Header from './Header.js';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
    <Header>
          <p>{props.userData}</p>
          <Link to="/sign-in" className="login__login-link">Выйти</Link>
    </Header>
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container" onClick={props.onEditAvatar}>
          <img
            src={hoverAvatar}
            alt="изменить аватар"
            className="profile__avatar-hover"
          />
          <img
            alt="фотография профиля"
            className="profile__avatar"
            src={currentUser.avatar}
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            type="button"
            className="profile__button-name-change"
            onClick={props.onEditProfile}
          />
          <p className="profile__occupation">{currentUser.about}</p>
        </div>
        <button
          type="button"
          className="profile__button-add-place"
          onClick={props.onAddPlace}
        />
      </section>
      <section className="elements">
        {props.cards.map((card) => (
          <Card
            onCardClick={props.onCardClick}
            key={card._id}
            card={card}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </main>
    </>
  );
}

export default Main;
