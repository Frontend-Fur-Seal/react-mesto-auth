import * as auth from './Auth.js';
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Header from './Header.js';
import AuthForm from './AuthForm.js';


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

  const handleSubmit = (e) => {
      e.preventDefault();
      handleLogin(formValue.email, formValue.password);
  }

    return (
      <>
      <Header>
      <Link to="/sign-up" className="login__login-link">Регистрация</Link>
    </Header>
        <div className="login">
          <p className="login__welcome">Вход</p>
          <AuthForm handleSubmit={handleSubmit} handleChange={handleChange} formValue={formValue} />
        </div>
        </>
    );
  }
  
  export default Login;
  