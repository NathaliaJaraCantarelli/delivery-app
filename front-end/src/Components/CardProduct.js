import React from 'react';
import PropTypes from 'prop-types';
import './CardProduct.css';
import { setLocalStorage } from '../functions/localStorageFunc';

const ROUTE = 'customer_products';
const PRICE = 'element-card-price';
const IMAGE = 'img-card-bg-image-';
const TITLE = 'element-card-title';
const RMITEM = 'button-card-rm-item-';
const ADDITEM = 'button-card-add-item-';
const QUANTITY = 'input-card-quantity-';

class CardProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      quantity: 0,
    };
  }

  async componentDidMount() {
    const { i } = this.props;
    const quantityProduct = JSON.parse(localStorage.getItem('CustomerProducts'));
    const [carQuantity] = quantityProduct.filter((product) => product.id === i);
    this.setState(() => ({ quantity: carQuantity.quantity }));
  }

  getLocalStorage = (type) => {
    const { i } = this.props;
    const quantity = JSON.parse(localStorage.getItem('CustomerProducts'));
    quantity.map((product) => {
      if ((product.id === i) && (type === 'add')) product.quantity += 1;
      if ((product.id === i) && (type === 'rm')) product.quantity -= 1;
      return product;
    });
    setLocalStorage(quantity);
    // localStorage.setItem('CustomerProducts', JSON.stringify(quantity));
  };

  addItem = () => {
    const { addValue, price } = this.props;
    this.setState((prevState) => ({ quantity: prevState.quantity + 1 }));
    addValue(price);
    this.getLocalStorage('add');
  };

  removeItem = () => {
    const { quantity } = this.state;
    if (quantity > 0) {
      const { rmValue, price } = this.props;
      this.setState((prevState) => ({ quantity: prevState.quantity - 1 }));
      rmValue(price);
      this.getLocalStorage('rm');
    }
  };

  render() {
    const { i, name, price, urlImage } = this.props;
    const { quantity } = this.state;
    return (
      <div className="cardProduct">
        <p data-testid={ `${ROUTE}__${PRICE}${i}` }>
          R$
          {price}
        </p>
        <img
          data-testid={ `${ROUTE}__${IMAGE}${i}` }
          src={ urlImage }
          alt={ name }
        />
        <p data-testid={ `${ROUTE}__${TITLE}${i}` }>{ name }</p>
        <div className="quantityItems">
          <button
            type="button"
            data-testid={ `${ROUTE}__${RMITEM}${i}` }
            onClick={ this.removeItem }
          >
            -
          </button>
          <input
            type="number"
            data-testid={ `${ROUTE}__${QUANTITY}${i}` }
            min={ 0 }
            value={ quantity }
            readOnly
          />
          <button
            type="button"
            data-testid={ `${ROUTE}__${ADDITEM}${i}` }
            onClick={ this.addItem }
          >
            +
          </button>
        </div>
      </div>
    );
  }
}

CardProduct.propTypes = {
  i: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  urlImage: PropTypes.string.isRequired,
  addValue: PropTypes.func.isRequired,
  rmValue: PropTypes.func.isRequired,
};

export default CardProduct;
