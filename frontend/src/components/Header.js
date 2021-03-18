import React from "react";
import logo from "../images/logo.png";
import { Link, useLocation } from "react-router-dom";

function Header({ email, handleSignOut }) {
  const location = useLocation();
  const renderLogin = () => {
    return(
      <div className="header__info">
        <Link to="/sign-up" className="auth__login-link">
          Регистрация
        </Link>
      </div>
    )
  }

  const renderReg = () => {
    return(
      <div className="header__info">
        <Link to="/sign-in" className="auth__login-link">
          Войти
        </Link>
      </div>
    )
  }

  const renderPage = () => {
    return(
      <div className="header__info">
        <p className="header__title">{email}</p>
        <button className="header__btn" onClick={handleSignOut}>
          Выйти
        </button>
      </div>
    )
  }

  const render = () => {
    if (location.pathname === '/') {
      return renderPage()
    } else if (location.pathname === '/sign-in') {
      return renderLogin()
    } else if (location.pathname === '/sign-up') {
      return renderReg()
    }
  }

  return (
    <header className="header">
      <img src={logo} alt="Логотип Mesto Russia" className="logo" />
      {render()}
    </header>
  );
}

export default Header;
