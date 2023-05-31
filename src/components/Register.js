import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Header from './Header.js';
import AuthForm from './AuthForm.js';

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
        <AuthForm handleSubmit={handleSubmit} handleChange={handleChange} formValue={formValue} />
        <div className="login__signin">
          <p>Уже зарегистрированы?</p>
          <Link to="/sign-in" className="login__login-link">Войти</Link>
        </div>
        </div>
      </>
    );
  }
  
  export default Register;