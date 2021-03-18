import React from "react";
import { Link } from "react-router-dom";

function Register({handleSubmitRegister}) {
  const [values, setValues] = React.useState({email: '', password: ''});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault(e);
    handleSubmitRegister(values);
  };
 
  return (
    <div className="auth">
      <p className="auth__title">Регистрация</p>
      <form onSubmit={handleSubmit} className="auth__form">
        <input
          className="auth__input"
          required
          id="username"
          name="email"
          type="text"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
        />
        <input
          className="auth__input"
          required
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          value={values.password}
          onChange={handleChange}
        />
        <button type="submit" onSubmit={handleSubmit} className="auth__btn">
          Зарегистрироваться
        </button>
      </form>
      <div className="auth__signin">
        <p className="auth__subtitle">Уже зарегистрированы?</p>
        <Link to="/sign-in" className="auth__login-link">
          Войти
        </Link>
      </div>
    </div>
  );
}

export default Register;
