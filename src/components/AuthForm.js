function AuthForm({
    handleSubmit,
    handleChange,
    formValue
}){
    return(
        <form onSubmit={handleSubmit} className="login__form">
          <input onChange={handleChange} value={formValue.email} autoComplete='on' className="login__input" required id="email" name="email" type="text" placeholder="Email" />
          <input onChange={handleChange} value={formValue.password} autoComplete='off' className="login__input" required id="password" name="password" type="password" placeholder="Пароль" />
          <button onSubmit={handleSubmit} type="submit" className="login__link">Войти</button>
        </form>
    )
}

export default AuthForm