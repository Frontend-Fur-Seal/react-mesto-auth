function SignIn() {
    return (
        <div className="login">
        <p className="login__welcome">Вход</p>
        <form className="login__form">
          <input className="login__input" required id="username" name="username" type="text" placeholder="Email" />
          <input className="login__input" required id="password" name="password" type="password" placeholder="Пароль" />
          <button type="submit" className="login__link">Войти</button>
        </form>
        </div>
    );
  }
  
  export default SignIn;
  