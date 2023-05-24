import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import CardOrder from '../Components/CardOrder';
import Header from '../Components/Header';
import { requestData } from '../services/request';
import CardOrderDetails from '../Components/CardOrderDetails';
import formatDate from '../functions/dateGenerate';

const ROUTE = 'customer_order_details';

function CustomerOrdersDetails() {
  const [orders, setOrders] = useState([]);
  const [dataProducts, setDataProducts] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const getOrder = async () => {
      const data = await requestData(`/sales/seller/${id}`);
      setOrders(data.products);
      setDataProducts(data);
      setIsLoading(false);
      // console.log(data);
    };
    getOrder();
  }, [id]);

  return (
    <>
      <Header />
      <h1>Detalhes do Pedidos</h1>
      <span
        data-testid={
          `${ROUTE}__element-order-details-label-order-id`
        }
      >
        { `PEDIDO ${id} `}
      </span>
      { isLoading ? <p>Carregando...</p> : (
        <>
          <span
            data-testid={
              `${ROUTE}__element-order-details-label-seller-name`
            }
          >
            { `P.Vend: ${dataProducts.seller.name} `}
          </span>
          <span
            data-testid={
              `${ROUTE}__element-order-details-label-order-date`
            }
          >
            { `${formatDate(dataProducts.saleDate)} `}
          </span>
          <span
            data-testid={
              `${ROUTE}__element-order-details-label-delivery-status-${id}`
            }
          >
            { `${dataProducts.status} `}
          </span>
          <button
            type="button"
            disabled
            data-testid={
              `${ROUTE}__button-delivery-check`
            }
          >
            MARCAR COMO ENTREGUE
          </button>
          <table>
            <thead>
              <tr>
                <td>Item</td>
                <td>Descrição</td>
                <td>Quantidade</td>
                <td>Valor Unitário</td>
                <td>Sub-total</td>
              </tr>
            </thead>
            <tbody>
              {orders.map((product, index) => (
                <tr key={ index }>
                  <CardOrderDetails
                    index={ index }
                    product={ product }
                    quantity={ product.SaleProduct.quantity }
                    route={ ROUTE }
                  />
                </tr>
              ))}
            </tbody>
          </table>
          <span
            data-testid={
              `${ROUTE}__element-order-total-price`
            }
          >
            { `Total: R$${dataProducts.totalPrice.toString().replace('.', ',')} `}
          </span>
        </>
      )}
    </>
  );
}

export default CustomerOrdersDetails;
