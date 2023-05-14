import React from 'react';
import PropTypes from 'prop-types';
import './CardProduct.css';
import { setLocalStorage } from '../functions/localStorageFunc';

const ROUTE = 'customer_products';
const PRICE = 'element-card-price-';
const IMAGE = 'img-card-bg-image-';
const TITLE = 'element-card-title-';
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

  getLocalStorage = () => {
    const { i } = this.props;
    const { quantity } = this.state;
    const quantityLocalStorage = JSON.parse(localStorage.getItem('CustomerProducts'));
    quantityLocalStorage.map((product) => {
      if ((product.id === i)) product.quantity = quantity;
      return product;
    });
    setLocalStorage(quantityLocalStorage);
  };

  handleChange = ({ target }) => {
    const { totalValueFunc } = this.props;
    this.setState(
      () => ({ quantity: Number(target.value) }),
      () => {
        this.getLocalStorage();
        totalValueFunc();
      },
    );
  };

  addItem = () => {
    const { totalValueFunc } = this.props;
    this.setState(
      this.setState((prevState) => ({ quantity: prevState.quantity + 1 })),
      () => {
        this.getLocalStorage();
        totalValueFunc();
      },
    );
  };

  removeItem = () => {
    const { totalValueFunc } = this.props;
    const { quantity } = this.state;
    if (quantity > 0) {
      this.setState(
        this.setState((prevState) => ({ quantity: prevState.quantity - 1 })),
        () => {
          this.getLocalStorage();
          totalValueFunc();
        },
      );
    }
  };

  render() {
    const { i, name, price, urlImage } = this.props;
    const { quantity } = this.state;
    return (
      <div className="cardProduct">
        <p>R$</p>
        <p data-testid={ `${ROUTE}__${PRICE}${i}` }>
          {price.toString().replace('.', ',')}
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
            name={ `${ROUTE}__${QUANTITY}${i}` }
            onChange={ this.handleChange }
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
  totalValueFunc: PropTypes.string.isRequired,
};

export default CardProduct;
