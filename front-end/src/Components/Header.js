import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const ROUTE = 'customer_products';
const PRODUCTS = 'element-navbar-link-products';
const ORDERS = 'element-navbar-link-orders';
const FULLNAME = 'element-navbar-user-full-name';
const LOGOUT = 'element-navbar-link-logout';
// mudar as rotas
class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
    };
  }

  componentDidMount() {
    const user = localStorage.getItem('user');
    if (user) {
      const userParsed = JSON.parse(user);
      this.setState({
        name: userParsed.name,
      });
    }
  }

  deleteLocalStorage() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  render() {
    const { name } = this.state;
    return (
      <div className="Header">
        <Link to="/customer/products">
          <button type="button" data-testid={ `${ROUTE}__${PRODUCTS}` }>PRODUTOS</button>
        </Link>
        <Link to="/customer/orders">
          <button type="button" data-testid={ `${ROUTE}__${ORDERS}` }>
            MEUS PEDIDOS
          </button>
        </Link>
        <button type="button" data-testid={ `${ROUTE}__${FULLNAME}` }>
          {name || 'USER'}
        </button>
        <Link to="/">
          <button
            type="button"
            data-testid={ `${ROUTE}__${LOGOUT}` }
            onClick={ this.deleteLocalStorage }
          >
            SAIR
          </button>
        </Link>
      </div>
    );
  }
}

export default Header;
