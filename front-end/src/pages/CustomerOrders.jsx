import Header from '../Components/Header';
import CardOrd from '../Components/CardOrder';

function CustomerOrders() {
  const arrayOrders = [
    {
      id: 1,
      status: 'pendente',
      saleDate: '12/12/2018',
      totalPrice: 23.80,
    },

    {
      id: 2,
      status: 'entregue',
      saleDate: '11/05/2020',
      totalPrice: 20.10,
    },
    {
      id: 3,
      status: 'pendente',
      saleDate: '19/12/2020',
      totalPrice: 23.80,
    },

    {
      id: 4,
      status: 'entregue',
      saleDate: '11/12/2021',
      totalPrice: 20.10,
    },
    {
      id: 5,
      status: 'pendente',
      saleDate: '12/11/2020',
      totalPrice: 23.80,
    },

    {
      id: 6,
      status: 'entregue',
      saleDate: '11/04/2020',
      totalPrice: 20.10,
    },
    {
      id: 7,
      status: 'pendente',
      saleDate: '12/12/2020',
      totalPrice: 23.80,
    },

    {
      id: 8,
      status: 'entregue',
      saleDate: '11/12/2020',
      totalPrice: 20.10,
    },
    {
      id: 9,
      status: 'pendente',
      saleDate: '12/12/2020',
      totalPrice: 23.80,
    },

    {
      id: 10,
      status: 'entregue',
      saleDate: '11/12/2020',
      totalPrice: 20.10,
    },

  ];

  return (
    <>
      <Header />
      <h1>Pedidos</h1>
      {arrayOrders.map((elem, ind) => <CardOrd key={ ind } data={ elem } />)}
    </>
  );
}

export default CustomerOrders;
