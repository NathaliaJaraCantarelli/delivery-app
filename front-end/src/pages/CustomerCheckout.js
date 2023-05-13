import React, { useState } from 'react';
import { reduceArr, setLocalStorage } from '../functions/localStorageFunc';

export default function CustomerCheckout() {
//   const [cart, setCart] = useState([1]);
//   const [totalCost, setTotalCost] = useState(0.00);

  const data = JSON.parse(localStorage.getItem('CustomerProducts'));
  const [cart, setCart] = useState(data.filter((product) => product.quantity > 0));

  // Algum useEffect para pegar o item do local storage  e fazer um reduce pra calcular o custo total

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

  // remover item com target e recalcular o preço total
  return (
    <div>
      { totalCost === 0 ? <p>carrinho vazio</p> : cart.map((product, index) => (
        <div
          key={ product.id }
        >
          <div
            data-testid={
              `customer_checkout__element-order-table-item-number-${index}`
            }
          >
            { product.id }
          </div>
          <div
            data-testid={
              `customer_checkout__element-order-table-name-${index}`
            }
          >
            { product.name }
          </div>
          <div
            data-testid={
              `customer_checkout__element-order-table-quantity-${index}`
            }
          >
            { product.quantity }
          </div>
          <div
            data-testid={
              `customer_checkout__element-order-table-unit-price-${index}`
            }
          >
            { product.price }
          </div>
          <div
            data-testid={
              `customer_checkout__element-order-table-sub-total-${index}`
            }
          >
            { (parseFloat(product.quantity) * parseFloat(product.price)).toFixed(2) }
          </div>
          <button
            data-testid={
              `customer_checkout__element-order-table-remove-${index}`
            }
            type="button"
            onClick={ () => removeItem(product.id) }
          >
            Remover
          </button>
        </div>
      ))}
      <div
        data-testid="customer_checkout__element-order-total-price"
      >
        { totalCost.toFixed(2) }
      </div>
      <div>
        <select
          label="select-seller"
          id="select-seller"
          data-testid="customer_checkout__select-seller"
        />
        <input
          data-testid="customer_checkout__input-address"
          type="text"
        />
        <input
          data-testid="customer_checkout__input-address-number"
          type="text"
        />
        <button
          data-testid="customer_checkout__button-submit-order"
          type="button"
        >
          FINALIZAR PEDIDO
        </button>
      </div>
    </div>
  );
}
