import React from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
// import RockGlass from './pages/RockGlass';
import CustomerProducts from './pages/CustomerProducts';
import CustomerCheckout from './pages/CustomerCheckout';
import CustomerOrders from './pages/CustomerOrders';
import CustomerOrdersDetails from './pages/CustomerOrdersDetails';
import './styles/App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import SellerOrders from './pages/SellerOrders';
import SellerOrderDetails from './pages/SellerOrdersDetails';
import AdminManage from './pages/AdminManage';

function App() {
  return (
    <Switch>
      <Route path="/login" component={ Login } />
      <Route path="/register" component={ Register } />
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route path="/customer/products" component={ CustomerProducts } exact />
      <Route path="/customer/checkout" component={ CustomerCheckout } />
      <Route path="/customer/orders/:id" component={ CustomerOrdersDetails } />
      <Route path="/customer/orders" component={ CustomerOrders } />
      <Route path="/seller/orders/:id" component={ SellerOrderDetails } />
      <Route path="/seller/orders" component={ SellerOrders } />
      <Route path="/admin/manage" component={ AdminManage } />
    </Switch>
  );
}

export default App;
