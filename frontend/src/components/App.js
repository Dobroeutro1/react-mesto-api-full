import React from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import "../index.css";
import "../components/Header";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import InfoTooltip from "./InfoTooltip";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CurrentCardContext } from "../contexts/CurrentCardContext";
import { ProtectedRoute } from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import * as auth from "../Auth";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(
    false
  );
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(
    false
  );
  const [selectedCard, setSelectedCard] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [InfoTooltipIsOpened, setInfoTooltipIsOpened] = React.useState(false);  
  const [registration, setRegisration] = React.useState(false);
  const history = useHistory();
  const token = localStorage.getItem('token')

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([getUserInfo, initialCards]) => {
        setCurrentUser(getUserInfo);
        setCards(initialCards);
      })
      .catch(() => {
        console.log("Что-то пошло не так :(");
      });
  }, []);

  React.useEffect(() => {
    if (token) {
      auth.checkToken(token)
        .then((res) => {
          if (res) {
            setEmail(res.data.email);
            setLoggedIn(true);
            history.push('/')
          }
        })
    }
  }, [history, token])

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(false);
    setInfoTooltipIsOpened(false);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (isLiked) {
      api
        .deleteLike(card, isLiked)
        .then((newCard) => {
          const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
          setCards(newCards);
        })
        .catch(() => {
          console.log("Что-то пошло не так :(");
        });
    } else {
      api
        .addLike(card, !isLiked)
        .then((newCard) => {
          const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
          setCards(newCards);
        })
        .catch(() => {
          console.log("Что-то пошло не так :(");
        });
    }
  }
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id);

        setCards(newCards);
      })
      .catch(() => {
        console.log("Что-то пошло не так :(");
      });
  }
  function handleUpdateUser(userInfo) {
    api
      .changeUserInfo(userInfo.name, userInfo.about)
      .then((userInfo) => {
        setCurrentUser(userInfo);
      })
      .catch(() => {
        console.log("Что-то пошло не так :(");
      });
  }
  function handleUpdateAvatar(userAvatar) {
    api
      .changeUserAvatar(userAvatar.avatar)
      .then((avatar) => {
        setCurrentUser(avatar);
      })
      .catch(() => {
        console.log("Что-то пошло не так :(");
      });
  }
  function handleAddPlaceSubmit(card) {
    api
      .addNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch(() => {
        console.log("Что-то пошло не так :(");
      });
  }
  function handleSubmitRegister(values) {
    auth.register(values.password, values.email)
    .then((res) => {
      if (res) {
        setInfoTooltipIsOpened(true)
        setRegisration(true)
        history.push('/sign-in');
      } else {
        setInfoTooltipIsOpened(true)
        setRegisration(false)
      }
    })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleSubmitLogin(values) {
    auth.authorize(values.password, values.email)
    .then((data) => {
      if (data.token) {
        setLoggedIn(true);
        history.push("/");
      }
    })
      .catch((err) => console.log(err));
  }
  function handleSignOut() {
    localStorage.removeItem('token');
    setEmail('');
    history.push('/sign-in');
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header email={email} handleSignOut={handleSignOut} />
      <CurrentCardContext.Provider value={cards}>
        <main className="content">
          <Switch>
            <ProtectedRoute
              exact
              path="/"
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              loggedIn={loggedIn}
              component={Main}
            ></ProtectedRoute>
            <Route path="/sign-up">
              <Register handleSubmitRegister={handleSubmitRegister}/>
            </Route>
            <Route path="/sign-in">
              <Login handleSubmitLogin={handleSubmitLogin}/>
            </Route>
            <Route>
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>
        </main>
      </CurrentCardContext.Provider>
      <Footer />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      ></EditProfilePopup>
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      ></AddPlacePopup>
      <PopupWithForm
        name="confirm"
        title="Вы уверены?"
        onClose={closeAllPopups}
      >
        <>
          <button type="submit" className="popup__save-btn popup__confirm-btn">
            <span>Да</span>
          </button>
        </>
      </PopupWithForm>
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      ></EditAvatarPopup>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      
      <InfoTooltip
        isOpen={InfoTooltipIsOpened}
        onClose={closeAllPopups}
        registration={registration}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
