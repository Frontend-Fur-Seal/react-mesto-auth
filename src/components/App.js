import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import api from "../utils/Api.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import Infotooltip from "./InfoTooltip.js";
import ProtectedRouteElement from './ProtectedRoute.js';
import Login from "./Login.js";
import Register from "./Register.js";
import * as auth from './Auth.js';

const App = () => {

  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(null);
  const [userData, setUserData] = useState(null);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAddPlacePopupOpen, setIsEditAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [isInfotooltipOpenOk, setIsInfotooltipOpenOk] = useState(false);
  const [isInfotooltipOpenError, setIsInfotooltipOpenError] = useState(false);

  const [cards, setNewCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  const [SelectedCard, setSelectedCard] = useState({ name: "", link: "" });

  useEffect(() => {
    const jwt = localStorage.getItem('token');
    if(jwt){
      auth.checkToken(jwt)
      .then((res) => {
        confirmUser(res.data.email);
      })
      .catch(() => {
        setLoggedIn(false);
      })
    }
  }, [])

function onSignOut(){
  localStorage.removeItem('token') 
}

function onLogin(token){
  localStorage.setItem('token', token) 
}

function confirmUser(email){
  setLoggedIn(true); 
  navigate('/')
  setUserData(email);
}

  const handleLogin = (email, password) => { 
    auth.authorize(email, password)
    .then((res) => {
      onLogin(res.token)
      confirmUser(email);
    })
    .catch((error) => {
      handleInfotooltipOpenError();
      (console.log(`Ошибка ${error}`))
    })
  }

  const handleRegister = (email, password) => {
    auth.register(email, password)
    .then(() => {
    navigate("/sign-in")
    handleInfotooltipOpenOk();
    })
    .catch((error) => {
      handleInfotooltipOpenError();
      (console.log(`Ошибка ${error}`))
    })
  }

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

  function handleInfotooltipOpenOk(){
    setIsInfotooltipOpenOk(!isInfotooltipOpenOk)
  }

  function handleInfotooltipOpenError(){
    setIsInfotooltipOpenError(!isInfotooltipOpenError)
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfotooltipOpenOk(false);
    setIsInfotooltipOpenError(false);
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

  function handleInfotooltip(title, back){

  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Routes>
          <Route path="/sign-in" element={<Login handleLogin={handleLogin} />} />
          <Route path="/sign-up" element={<Register handleRegister={handleRegister} />} />
          <Route path="/" element={<ProtectedRouteElement 
            element={Main} 
            loggedIn={loggedIn}
            onSignOut={onSignOut}
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
        <Infotooltip name = {'infotool'} isOpen={isInfotooltipOpenOk} onClose={closeAllPopups} resOk={true} />
        <Infotooltip name = {'infotool'} isOpen={isInfotooltipOpenError} onClose={closeAllPopups} resOk={false} />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
