import { useEffect, useState } from 'react';
import CardOrder from '../Components/CardOrder';
import Header from '../Components/Header';

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
      const data = await requestData(`/sales/${id}`);
      setOrders(data);
    };
    getOrder();
  }, [id]);

  return (
    <>
      <Header />
      <h1>Pedidos</h1>
      {orders.map((elem, ind) => (
        <CardOrder key={ ind } data={ elem } route="customer_order_details" />))}
    </>
  );
}

export default CustomerOrdersDetails;
