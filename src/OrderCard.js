import React from "react";

const OrderCard = ({ order, button }) => {
  const fromDate = new Date(order.fromDate);
  const toDate = new Date(order.toDate);
  return (
    <div className="ui card">
      <div className="content">
        <div className="header">
          <label>Owner: </label>
          {order.apartmentOwnerName}
        </div>
        <div className="header">
          <label>Rented by: </label>
          {order.renterName}
        </div>
        <div className="header">
          <label>Paying: </label>
          {order.price}
        </div>
        <div className="header">
          <label>From: </label>
          {fromDate.getDay() +
            "/" +
            fromDate.getMonth() +
            "/" +
            fromDate.getFullYear()}
        </div>
        <div className="header">
          <label>To: </label>
          {toDate.getDay() +
            "/" +
            toDate.getMonth() +
            "/" +
            toDate.getFullYear()}
        </div>
        {button}
      </div>
    </div>
  );
};

export default OrderCard;
