import React from "react";

function PopupWithForm({ name, title, children, isOpen, onClose, onSubmit }) {
  return (
    <section
      className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form
          action="#"
          className={`popup__form popup__form-${name}`}
          noValidate
          onSubmit={onSubmit}
        >
          {children}
        </form>
        <button className="popup__close-btn" onClick={onClose}></button>
      </div>
    </section>
  );
}

export default PopupWithForm;
