import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { reduceArr, setLocalStorage } from '../functions/localStorageFunc';
import { requestAllSales, requestAllSellers } from '../services/request';
import CardOrderDetails from '../Components/CardOrderDetails';
import Header from '../Components/Header';

const ROUTE = 'customer_checkout';

export default function CustomerCheckout() {
  const history = useHistory();
  const data = JSON.parse(localStorage.getItem('CustomerProducts'));
  const [cart, setCart] = useState(data.filter((product) => product.quantity > 0));
  const [sellers, setSellers] = useState([]);
  const [sellerID, setSellerID] = useState(sellers);
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState(0);

  useEffect(() => {
    const getSellers = async () => {
      if (sellers.length > 0) return true;
      const allSellers = await requestAllSellers('/user/role', { role: 'seller' });
      setSellers(allSellers);
    };
    getSellers();
    if (sellers.length > 0) setSellerID(sellers[0].id);
  }, [sellers]);

  const totalCost = reduceArr(cart);

  const removeItem = (index) => {
    const newArr = data.map((product) => {
      if (product.id === index) product.quantity = 0;
      return product;
    });
    setLocalStorage(newArr);
    const remove = cart.filter((product) => product.id !== index);
    setCart(remove);
  };

  const createSale = async () => {
    const { id } = JSON.parse(localStorage.getItem('user'));
    const products = cart
      .map((product) => ({ id: product.id, quantity: product.quantity }));
    console.log(products);
    const newSale = {
      userId: id,
      sellerId: sellerID,
      totalPrice: totalCost,
      deliveryAddress: address,
      deliveryNumber: Number(number),
      saleDate: new Date(),
      products,
    };
    const { id: saleID } = await requestAllSales('/sales/newsale', newSale);
    localStorage.removeItem('CustomerProducts');
    history.push(`/customer/orders/${saleID}`);
  };

  return (
    <div>
      <Header route={ ROUTE } />
      { totalCost === 0 ? <p>Carrinho vazio</p> : (
        <table>
          <thead>
            <tr>
              <td>Item</td>
              <td>Descrição</td>
              <td>Quantidade</td>
              <td>Valor Unitário</td>
              <td>Sub-total</td>
              <td>Remover Item</td>
            </tr>
          </thead>
          { cart.map((product, index) => (
            <tbody key={ product.id }>
              <tr>
                <CardOrderDetails
                  index={ index }
                  product={ product }
                  quantity={ product.quantity }
                  route={ ROUTE }
                />
                <td>
                  <button
                    data-testid={
                      `customer_checkout__element-order-table-remove-${index}`
                    }
                    type="button"
                    onClick={ () => removeItem(product.id) }
                  >
                    Remover
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>)}
      <p>Total: R$</p>
      <div
        data-testid="customer_checkout__element-order-total-price"
      >
        { totalCost.toFixed(2).toString().replace('.', ',') }
      </div>
      <div>
        <select
          label="select-seller"
          id="select-seller"
          data-testid="customer_checkout__select-seller"
        >
          { sellers.map((seller, index) => (
            <option key={ index } value={ seller.name }>{seller.name}</option>))}
        </select>
        <input
          data-testid="customer_checkout__input-address"
          type="text"
          value={ address }
          onChange={ ({ target }) => setAddress(target.value) }
        />
        <input
          data-testid="customer_checkout__input-address-number"
          type="number"
          value={ number }
          onChange={ ({ target }) => setNumber(target.value) }
        />
        <button
          data-testid="customer_checkout__button-submit-order"
          type="button"
          onClick={ createSale }
        >
          FINALIZAR PEDIDO
        </button>
      </div>
    </div>
  );
}
