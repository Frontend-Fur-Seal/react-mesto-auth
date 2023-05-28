import * as auth from './Auth.js';
import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header.js';


function Login({handleLogin}) {

  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const navigate = useNavigate();

  const handleSubmit = (e) => {
      e.preventDefault();
        auth.authorize(formValue.email, formValue.password).then((res) => {
          console.log(res);
          handleLogin(formValue.email);
          navigate('/')
        });
  }

    return (
      <>
      <Header>
      <Link to="/sign-up" className="login__login-link">Регистрация</Link>
    </Header>
        <div className="login">
        <p className="login__welcome">Вход</p>
        <form onSubmit={handleSubmit} className="login__form">
          <input onChange={handleChange} className="login__input" required id="email" name="email" type="text" placeholder="Email" />
          <input onChange={handleChange} className="login__input" required id="password" name="password" type="password" placeholder="Пароль" />
          <button onSubmit={handleSubmit} type="submit" className="login__link">Войти</button>
        </form>
        </div>
        </>
    );
  }
  
  export default Login;
  