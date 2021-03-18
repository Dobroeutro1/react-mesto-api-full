import React from "react";
import succesSvg from '../images/succes-reg.svg';
import errorSvg from '../images/error-reg.svg';

function InfoTooltip({ isOpen, onClose, registration }) {
  const render = () => {
    if (registration) {
      return(
        <React.Fragment>
          <img src={succesSvg} alt="Регистрация прошла успешно!" className="popup__image popup__image_type_tooltip" />
          <h2 className="popup__title popup__title_type_tooltip">Вы успешно зарегистрировались!</h2>
          <button className="popup__close-btn" onClick={onClose}></button>
        </React.Fragment>
      )
    } else {
      return(
        <React.Fragment>
          <img src={errorSvg} alt="Ошибка регистрации!" className="popup__image popup__image_type_tooltip" />
          <h2 className="popup__title popup__title_type_tooltip">Что-то пошло не так! Попробуйте еще раз.</h2>
          <button className="popup__close-btn" onClick={onClose}></button>
        </React.Fragment>
      )
    }
  }

  return (
    <section className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        {render()}
      </div>
    </section>
  );
}

export default InfoTooltip;
