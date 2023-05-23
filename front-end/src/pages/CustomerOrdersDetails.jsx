import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CardOrder from '../Components/CardOrder';
import Header from '../Components/Header';
import { requestData } from '../services/request';

function CustomerOrdersDetails() {
  const [orders, setOrders] = useState([]);
  const { id } = useParams();

  // useEffect(() => {
  //   const user = localStorage.getItem('user');
  //   if (user) {
  //     const userParsed = JSON.parse(user);
  //     const { id } = userParsed;
  //     const callAllSales = async () => {
  //       const allSales = await requestAllSales('/sales', { id });
  //       setOrders(allSales);
  //     };
  //     callAllSales();
  //   }
  // }, []);

  useEffect(() => {
    const getOrder = async () => {
      const data = await requestData(`/sales/seller/${id}`);
      setOrders(data);
    };
    getOrder();
  }, [id]);

  return (
    <>
      <Header />
      <h1>Detalhes do Pedidos</h1>
      {orders.map((elem, ind) => (
        <CardOrder key={ ind } data={ elem } route="customer_order_details" />))}
    </>
  );
}

export default CustomerOrdersDetails;
