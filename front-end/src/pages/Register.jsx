import React from 'react';
import { Redirect } from 'react-router-dom';
import { requestRegister } from '../services/request';

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      disabledBtn: true,
      errorMessage: false,
      createdUser: false,
    };
  }

  verifyInfo = () => {
    const { name, email, password } = this.state;
    const DOZE = 12;
    const SEIS = 6;
    const re = /\S+@\S+\.\S+/;
    const verifyName = name.length >= DOZE;
    const verifyPassword = password.length >= SEIS;
    const verifyEmail = re.test(email);

    if (verifyName && verifyPassword && verifyEmail) {
      this.setState({ disabledBtn: false, errorMessage: false });
    } else {
      this.setState({ disabledBtn: true });
      if (name.length > 0 && password.length > 0 && email.length > 0) {
        this.setState({ errorMessage: true });
      }
    }
  };

  sendInfo = async () => {
    const { name, email, password } = this.state;
    try {
      await requestRegister('/register', { name, email, password });
      this.setState({ createdUser: true });
    } catch (error) {
      throw new Error(error);
    }
  };

  handleAll = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.verifyInfo());
  };

  render() {
    const { name, email, password, disabledBtn, errorMessage, createdUser } = this.state;

    if (createdUser) return <Redirect to="/customer/products" />;
    return (
      <div>
        <h1>Cadastro</h1>
        <form>
          <label htmlFor="nameInput">
            Nome
            <input
              type="text"
              id="nameInput"
              name="name"
              value={ name }
              placeholder="Seu nome"
              data-testid="common_register__input-name"
              onChange={ this.handleAll }
            />
          </label>

          <label htmlFor="idInput">
            Email
            <input
              type="email"
              id="idInput"
              name="email"
              placeholder="seu-email@site.com.br"
              data-testid="common_register__input-email"
              value={ email }
              onChange={ this.handleAll }
            />
          </label>

          <label htmlFor="passwordInput">
            Senha
            <input
              type="password"
              id="passwordInput"
              name="password"
              placeholder="*********"
              data-testid="common_register__input-password"
              value={ password }
              onChange={ this.handleAll }
            />
          </label>

          <button
            type="button"
            onClick={ this.sendInfo }
            data-testid="common_register__button-register"
            disabled={ disabledBtn }
          >
            CADASTRAR
          </button>

          <p
            data-testid="common_register__element-invalid_register"
          >
            { errorMessage ? 'Preencha todos os campos corretamente' : ''}
          </p>
        </form>
      </div>
    );
  }
}

export default Register;
