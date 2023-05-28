import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import * as auth from './Auth.js';

function Register() {

    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
      })
      
    const navigate = useNavigate();

    const handleChange = (e) => {
      const {name, value} = e.target;

      setFormValue({
        ...formValue,
        [name]: value
      });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
          auth.register(formValue.email, formValue.password).then((res) => {
            console.log(res)
            navigate('/login', {replace: true});
          });
    }

    return (
        <div className="login">
        <p className="login__welcome">Регистрация</p>
        <form onSubmit={handleSubmit} className="login__form">
          <input onChange={handleChange} className="login__input" required id="email" name="email" type="text" placeholder="Email" />
          <input onChange={handleChange} className="login__input" required id="password" name="password" type="password" placeholder="Пароль" />
          <button onSubmit={handleSubmit} type="submit" className="login__link">Зарегистрироваться</button>
        </form>
        <div className="login__signin">
          <p>Уже зарегистрированы?</p>
          <Link to="/sign-in" className="login__login-link">Войти</Link>
        </div>
        </div>
    );
  }
  
  export default Register;