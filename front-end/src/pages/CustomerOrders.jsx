import { useEffect, useState } from 'react';
import Header from '../Components/Header';
import CardOrd from '../Components/CardOrder';
import { requestAllSales } from '../services/request';

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
      <Header />
      <h1>Pedidos</h1>
      {orders.map((elem, ind) => <CardOrd key={ ind } data={ elem } />)}
    </>
  );
}

export default CustomerOrders;

// const arrayOrders = [
//   {
//     id: 1,
//     status: 'pendente',
//     saleDate: '12/12/2018',
//     totalPrice: 23.80,
//   },

//   {
//     id: 2,
//     status: 'entregue',
//     saleDate: '11/05/2020',
//     totalPrice: 20.10,
//   },
//   {
//     id: 3,
//     status: 'pendente',
//     saleDate: '19/12/2020',
//     totalPrice: 23.80,
//   },

//   {
//     id: 4,
//     status: 'entregue',
//     saleDate: '11/12/2021',
//     totalPrice: 20.10,
//   },
//   {
//     id: 5,
//     status: 'pendente',
//     saleDate: '12/11/2020',
//     totalPrice: 23.80,
//   },

//   {
//     id: 6,
//     status: 'entregue',
//     saleDate: '11/04/2020',
//     totalPrice: 20.10,
//   },
//   {
//     id: 7,
//     status: 'pendente',
//     saleDate: '12/12/2020',
//     totalPrice: 23.80,
//   },

//   {
//     id: 8,
//     status: 'entregue',
//     saleDate: '11/12/2020',
//     totalPrice: 20.10,
//   },
//   {
//     id: 9,
//     status: 'pendente',
//     saleDate: '12/12/2020',
//     totalPrice: 23.80,
//   },

//   {
//     id: 10,
//     status: 'entregue',
//     saleDate: '11/12/2020',
//     totalPrice: 20.10,
//   },

// ];
