import { useEffect, useState } from 'react';
import Header from '../Components/Header';
import CardOrder from '../Components/CardOrder';
import { requestAllSales } from '../services/request';

const ROUTE = 'customer_orders';

function CustomerOrders() {
  const [orders, setOrders] = useState([]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const userParsed = JSON.parse(user);
      const { id } = userParsed;
      const callAllSales = async () => {
        const allSales = await requestAllSales('/sales', { id });
        setOrders(allSales);
      };
      callAllSales();
    }
  }, []);

  return (
    <>
      <Header route={ ROUTE } />
      <h1>Pedidos</h1>
      {orders.map((elem, ind) => (
        <CardOrder key={ ind } data={ elem } route={ ROUTE } />))}
    </>
  );
}

export default CustomerOrders;
