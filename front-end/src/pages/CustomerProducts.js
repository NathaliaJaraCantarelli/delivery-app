import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../Components/Header';
import CardProduct from '../Components/CardProduct';
import { requestData } from '../services/request';
import { reduceArr, setLocalStorage } from '../functions/localStorageFunc';
import './CustomerProducts.css';

const ROUTE = 'customer_products';
const CART = 'button-cart';
const VALUE = 'checkout-bottom-value';

class CustomerProducts extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      totalValue: 0,
    };
  }

  async componentDidMount() {
    const carShop = JSON.parse(localStorage.getItem('CustomerProducts'));
    if (carShop) {
      this.setState({ products: carShop });
      const cart = carShop.filter((product) => product.quantity > 0);
      const totalCost = reduceArr(cart);
      this.setState({ totalValue: totalCost });
    } else {
      const data = await requestData('/customer/products');
      const dataWithQuantity = data.map((dado) => {
        dado.quantity = 0;
        return dado;
      });
      this.setState({ products: dataWithQuantity });
      setLocalStorage(dataWithQuantity);
    }
  }

  totalValueFunc = async () => {
    const data = JSON.parse(localStorage.getItem('CustomerProducts'));
    if (data) {
      const cart = data.filter((product) => product.quantity > 0);
      const totalCost = reduceArr(cart);
      this.setState({ totalValue: totalCost });
    }
  };

  addValue = async (value) => {
    const nValue = parseFloat(value);
    this.setState((prevState) => ({ totalValue: prevState.totalValue + nValue }));
  };

  rmValue = (value) => {
    const nValue = parseFloat(value);
    this.setState((prevState) => ({ totalValue: prevState.totalValue - nValue }));
  };

  render() {
    const { totalValue, products } = this.state;
    return (
      <div className="CustomerProducts">
        <Header />
        <ul className="products">
          { products.map((card, index) => (
            <CardProduct
              key={ index }
              i={ card.id }
              name={ card.name }
              price={ card.price }
              urlImage={ card.urlImage }
              addValue={ this.addValue }
              rmValue={ this.rmValue }
              totalValueFunc={ this.totalValueFunc }
            />
          ))}
        </ul>
        <Link to="/customer/checkout">
          <button
            type="button"
            disabled={ Number(totalValue) === 0 }
            data-testid={ `${ROUTE}__${CART}` }
          >
            Ver carrinho: R$
            <p data-testid={ `${ROUTE}__${VALUE}` }>
              { totalValue.toFixed(2).toString().replace('.', ',') }
            </p>
          </button>
        </Link>
      </div>
    );
  }
}

export default CustomerProducts;
