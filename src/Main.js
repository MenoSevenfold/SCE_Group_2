import React from "react";
import Apartments from "./Apartments";
import MyApartments from "./MyApartments";

const Main = ({ match }) => {
  return match.params.type === "tenant" ? (
    <Apartments type={match.params.type} userID={match.params.userID} />
  ) : (
    <MyApartments type={match.params.type} userID={match.params.userID} />
  );
};

export default Main;
