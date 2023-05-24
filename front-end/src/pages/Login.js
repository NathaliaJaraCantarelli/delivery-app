import React, { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { requestLogin, setToken } from '../services/request';
import '../styles/login.css';
import logoImg from '../images/logo.jpeg';

function Login() {
  const [login, setLogin] = useState({ email: '', password: '' });
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  const [failedTryLogin, setFailedTryLogin] = useState(false);
  const history = useHistory();

  function verifyLogin() { /* faz a verificação dos inputs de email e password */
    const { email, password } = login;
    const MIN_PASSWORD = 5;
    const regex = (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);
    const verifyEmail = regex.test(email);
    const verifyPassword = password.length > MIN_PASSWORD;
    const btnState = verifyEmail && verifyPassword;
    setBtnDisabled(!btnState);
  }

  function onSubmit() {
    const user = { email: login.email };
    localStorage.setItem('user', JSON.stringify(user));
    history.push('/register');
  }

  const reqLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await requestLogin('/login', {
        email: email.value, password: password.value });
      localStorage.setItem('token', user.token);
      setToken(user.token);
      localStorage.setItem('user', JSON.stringify(user));
      setIsLogged(true);
    } catch (error) {
      setFailedTryLogin(true);
      setIsLogged(false);
    }
  };

  function handleChange({ target }) {
    setLogin({
      ...login,
      [target.name]: target.value,
    });
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLogged(true);
    }
    setBtnDisabled(true);
    setFailedTryLogin(false);
    verifyLogin();
  }, [login]);

  if (isLogged) {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    if (user.role === 'seller') return <Redirect to="/seller/orders" />;
    if (user.role === 'administrator') return <Redirect to="/admin/manage" />;
    return <Redirect to="/customer/products" />;
  }

  return (
    <div className="container_login">
      <form className="box_login">
        <img
          src={ logoImg }
          alt="Descrição da imagem"
          width="80"
          className=".logo"
        />
        <h1>Delivery App</h1>
        <label htmlFor="email">
          Email:
          <input
            data-testid="common_login__input-email"
            id="email"
            type="email"
            name="email"
            placeholder="email"
            value={ login.email }
            onChange={ handleChange }
          />
        </label>
        {
          (failedTryLogin)
            ? (
              <span
                data-testid="common_login__element-invalid-email"
                className="message_span"
              >
                Invalid Email/Password
              </span>
            )
            : null
        }
        <label htmlFor="password">
          Password:
          <input
            data-testid="common_login__input-password"
            id="password"
            type="password"
            name="password"
            placeholder="password"
            value={ login.password }
            onChange={ handleChange }
          />
        </label>
        <button
          data-testid="common_login__button-login"
          type="button"
          onClick={ (event) => reqLogin(event) }
          disabled={ btnDisabled }
        >
          Enter
        </button>
        <button
          data-testid="common_login__button-register"
          type="button"
          onClick={ onSubmit }
        >
          Create Account
        </button>
      </form>
    </div>
  );
}

// Login.propTypes = {
//   history: PropTypes.shape({
//     push: PropTypes.func.isRequired,
//   }).isRequired,
// };

export default Login;
