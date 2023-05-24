import PropTypes from 'prop-types';
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
      router: '',
    };
  }

  componentDidMount() {
    const { route } = this.props;
    const actualRooute = route.split('_');
    this.setState({ router: actualRooute[0] });
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
    const { name, router } = this.state;
    return (
      <div className="Header">
        { router === 'customer' && (
          <Link to="/customer/products">
            <button type="button" data-testid={ `${ROUTE}__${PRODUCTS}` }>
              PRODUTOS
            </button>
          </Link>
        )}
        <Link to={ `/${router}/orders` }>
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

Header.propTypes = {
  route: PropTypes.string.isRequired,
};

export default Header;
