import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <section
      className={`popup ${card && "popup_opened"}`}
      data-popup-name="popup-image"
    >
      <div className="popup__container popup__container-image">
        <img src={card.link} alt={card.name} className="popup__image" />
        <h2 className="popup__title-img">{card.name}</h2>
        <button
          className="popup__close-btn popup__close-btn-img"
          onClick={onClose}
        ></button>
      </div>
    </section>
  );
}

export default ImagePopup;
