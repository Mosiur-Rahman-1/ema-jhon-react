import React, { createContext } from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Shop from './Components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Review from './Components/Review/Review';
import Inventory from './Components/Inventory/Inventory';
import NotFound from './Components/Not Found/NotFound';
import ProductDetail from './Components/Product Details/ProductDetail';
import Shipment from './Components/Shipment/Shipment';
import LogIn from './Components/LogIn/LogIn';
import { useState } from 'react';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value = {[loggedInUser, setLoggedInUser]}>
      <h1>User email: {loggedInUser.email}</h1>
      <Router>
      <Header></Header>
        <Switch>
          <Route path ="/shop">
            <Shop></Shop>
          </Route>
          <Route path ="/order">
            <Review></Review>
          </Route>
          <PrivateRoute path ="/inventory">
            <Inventory></Inventory>
          </PrivateRoute>
          <PrivateRoute path ="/shipment">
            <Shipment></Shipment>
          </PrivateRoute>
          <Route path ="/logIn">
            <LogIn></LogIn>
          </Route>
          <PrivateRoute path ="/shipment">
            <Shipment></Shipment>
          </PrivateRoute>
          <Route exact path = "/">
            <Shop></Shop>
          </Route>
          <Route path = "/product/:productkey">
            <ProductDetail></ProductDetail>
          </Route>
          <Route path = "*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
