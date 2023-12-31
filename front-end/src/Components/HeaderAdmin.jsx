import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const ROUTE = 'admin_manage';
// const PRODUCTS = 'element-navbar-link-orders';
// const ORDERS = 'element-navbar-link-orders';
const FULLNAME = 'element-navbar-user-full-name';
const LOGOUT = 'element-navbar-link-logout';
// mudar as rotas
class HeaderAdmin extends React.Component {
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

export default HeaderAdmin;
