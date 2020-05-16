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
  );
}

export default App;
