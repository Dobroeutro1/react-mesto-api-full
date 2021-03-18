import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({
  card,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  function handleCardClick() {
    onCardClick(card);
  }
  function handleLikeClick() {
    onCardLike(card);
  }
  function handleCardDelete() {
    onCardDelete(card);
  }
  
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  const cardDeleteButtonClassName = `card__trash-btn ${
    isOwn ? "card__trash-btn_visible" : "card__trash-btn_hidden"
  }`;
  const cardLikeButtonClassName = `card__like-btn ${
    isLiked ? "card__like-btn_liked" : ""
  }`;

  return (
    <div className="card">
      <img
        src={card.link}
        alt={card.name}
        className="card__img"
        onClick={handleCardClick}
      />
      <div className="card__item">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <p className="card__like-counter">{card.likes.length}</p>
        </div>
      </div>
      <button
        className={cardDeleteButtonClassName}
        onClick={handleCardDelete}
      ></button>
    </div>
  );
}

export default Card;
