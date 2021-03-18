import React from "react";

function Login({handleSubmitLogin}) {
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
    handleSubmitLogin(values);
  };

  return (
    <div className="auth">
      <p className="auth__title">Вход</p>
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
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
