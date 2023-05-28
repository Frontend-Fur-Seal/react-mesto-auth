import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import api from "../utils/Api.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import ProtectedRouteElement from './ProtectedRoute.js';
import Login from "./Login.js";
import Register from "./Register.js";

const App = () => {

  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleLogin = (user) => {
    setLoggedIn(true);  
    setUserData(user);
  }

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAddPlacePopupOpen, setIsEditAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [cards, setNewCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  const [SelectedCard, setSelectedCard] = useState({ name: "", link: "" });

  useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        setNewCards(data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    api
      .getInitialUser()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => console.error(err));
  }, []);

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setNewCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.error(err));
  }

  function handleCardDelete(card) {
    api
      .cardDelete(card._id)
      .then(() => {
        setNewCards((state) => state.filter((c) => c._id != card._id));
      })
      .catch((err) => console.error(err));
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsEditAddPlacePopupOpen(!isEditAddPlacePopupOpen);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({ name: "", link: "" });
  }

  function handleUpdateUser({ name, about }) {
    api
      .postInitialUser({ name, about })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.error(err));
  }

  function handleAddPlaceSubmit({ name, link }) {
    api
      .postInitialCard({ name, link })
      .then((newCard) => {
        setNewCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.error(err));
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .postInitialUserAvatar({ avatar })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.error(err));
  }

  return (
  <BrowserRouter>
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Routes>
          <Route path="/sign-in" element={<Login handleLogin={handleLogin} userData={userData} />} />
          <Route path="/sign-up" element={<Register />} />
          <Route path="/" element={<ProtectedRouteElement 
            element={Main} 
            loggedIn={loggedIn}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            onEditProfile={handleEditProfileClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}  
            userData={userData}       
            />} />
          <Route path="*" element={<Login />} />
        </Routes>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isEditAddPlacePopupOpen}
          onClose={closeAllPopups}
          onLoadedPlace={handleAddPlaceSubmit}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup card={SelectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  </BrowserRouter>
  );
};

export default App;
