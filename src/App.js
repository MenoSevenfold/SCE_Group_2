<<<<<<< HEAD
import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
=======
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./Login";
import Main from "./Main";
import EditApartment from "./EditApartment";
import AddApartment from "./AddApartment";
import OrderApartment from "./OrderApartment";
import OrderTracker from "./OrderTracker";
import Register from "./Register";

function App() {
  return (
    <BrowserRouter basename={`${process.env.PUBLIC_URL}/`}>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/Register" exact component={Register} />
        <Route
          path="/AddApartment/:type&:userID"
          exact
          component={AddApartment}
        />
        <Route
          path="/Edit/:type&:userID&:apartmentID"
          exact
          component={EditApartment}
        />
        <Route
          path="/Order/:type&:userID&:apartmentID"
          exact
          component={OrderApartment}
        />
        <Route path="/MyOrders/:type&:userID" exact component={OrderTracker} />
        <Route path="/Main/:type&:userID" exact component={Main} />
      </Switch>
    </BrowserRouter>
>>>>>>> 40f86be... Fixing some amsll issues
  );
}

export default App;
