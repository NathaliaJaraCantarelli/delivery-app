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
      buttonCart: true,
    };
  }

  async componentDidMount() {
    const carShop = JSON.parse(localStorage.getItem('CustomerProducts'));
    if (carShop) {
      this.setState({ products: carShop });
      const cart = carShop.filter((product) => product.quantity > 0);
      const totalCost = reduceArr(cart);
      this.setState({ totalValue: totalCost });
      if (totalCost === 0) this.setState({ buttonCart: true });
      else this.setState({ buttonCart: false });
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
    const { totalValue } = this.state;
    const data = JSON.parse(localStorage.getItem('CustomerProducts'));
    if (data) {
      const cart = data.filter((product) => product.quantity > 0);
      const totalCost = reduceArr(cart);
      this.setState(
        { totalValue: totalCost },
        () => {
          if (totalValue === 0) this.setState({ buttonCart: true });
          else this.setState({ buttonCart: false });
        },
      );
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
    const { totalValue, products, buttonCart } = this.state;
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
            disabled={ buttonCart }
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

// function CustomerProducts() {
//   const { products, totalValue, setTotalValue } = useContext(Context);

//   addValue = async (value) => {
//     const nValue = parseFloat(value);
//     setTotalValue(totalValue + nValue);
//   };

//   rmValue = (value) => {
//     const nValue = parseFloat(value);
//     setTotalValue(totalValue - nValue);
//   };

//   return (
//     <div className="CustomerProducts">
//       <Header />
//       <ul className="products">
//         { products.map((card, index) => (
//           <CardProduct
//             key={ index }
//             i={ card.id }
//             name={ card.name }
//             price={ card.price }
//             urlImage={ card.urlImage }
//           />
//         ))}
//       </ul>
//       <Link to="/customer/checkout">
//         <button
//           type="button"
//           data-testid={ `${ROUTE}__${CART}` }
//         >
//           Ver carrinho: R$
//           <p data-testid={ `${ROUTE}__${VALUE}` }>{ totalValue.toFixed(2) }</p>
//         </button>
//       </Link>
//     </div>
//   );
// }

// export default CustomerProducts;
