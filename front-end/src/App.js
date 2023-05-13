import React from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
// import RockGlass from './pages/RockGlass';
import CustomerProducts from './pages/CustomerProducts';
import CustomerCheckout from './pages/CustomerCheckout';
import './styles/App.css';
import Login from './pages/Login';

function App() {
  return (
    <Switch>
      <Route path="/login" component={ Login } />
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route path="/customer/products" component={ CustomerProducts } exact />
      <Route path="/customer/checkout" component={ CustomerCheckout } />
    </Switch>
  );
}

export default App;
