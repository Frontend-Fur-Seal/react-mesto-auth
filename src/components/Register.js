import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Header from './Header.js';

function Register({ handleRegister }) {

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

    const handleSubmit = (e) => {
        e.preventDefault();
        handleRegister(formValue.email, formValue.password)
    }

    return (
      <>
        <Header>
          <Link to="/sign-in" className="login__login-link">Войти</Link>
        </Header>
        <div className="login">
        <p className="login__welcome">Регистрация</p>
        <form onSubmit={handleSubmit} className="login__form">
          <input onChange={handleChange} value={formValue.email} autoComplete='on' className="login__input" required id="email" name="email" type="text" placeholder="Email" />
          <input onChange={handleChange}  value={formValue.password} autoComplete='off' className="login__input" required id="password" name="password" type="password" placeholder="Пароль" />
          <button onSubmit={handleSubmit} type="submit" className="login__link">Зарегистрироваться</button>
        </form>
        <div className="login__signin">
          <p>Уже зарегистрированы?</p>
          <Link to="/sign-in" className="login__login-link">Войти</Link>
        </div>
        </div>
      </>
    );
  }
  
  export default Register;