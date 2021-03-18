import React from "react";
import Card from "./Card";
import { CurrentCardContext } from "../contexts/CurrentCardContext";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditProfile,
  onEditAvatar,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const currentCard = React.useContext(CurrentCardContext);
  return (
    <>
      <section className="profile">
        <div className="profile__img" onClick={onEditAvatar}>
          <img
            src={currentUser.avatar}
            alt="Аватар"
            className="profile__avatar"
          />
        </div>
        <div className="profile__info">
          <div className="profile__top">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button
              className="profile__edit-btn"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button className="profile__add-btn" onClick={onAddPlace}></button>
      </section>

      <div className="cards">
        {currentCard.map((card) => {
          return (
            <Card
              card={card}
              key={card._id}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          );
        })}
      </div>
    </>
  );
}

export default Main;
