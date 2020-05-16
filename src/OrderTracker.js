import React, { useEffect, useState } from "react";
import { server } from "./api";
import { Link } from "react-router-dom";
import OrderCard from "./OrderCard";

const OrderTracker = ({ match }) => {
  const [orderList, setOrderList] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      server
        .get("/get_orders", {
          params: {
            userID: match.params.userID,
          },
        })
        .then((res) => {
          setOrderList(res.data);
        });
    };
    fetch();
  }, [match]);

  const createApartmentCard = (order, ind) => {
    console.log(match.params.type, match.params.userID);

    return <OrderCard key={ind} order={order} />;
  };
  const emptyApartment = () => {
    return (
      <div className="ui card">
        <div className="content">
          <div className="header">
            <label>There is no orders</label>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div>
      <div className="ui cards">
        {orderList.length === 0
          ? emptyApartment()
          : orderList.map((order, ind) => {
              return createApartmentCard(order, ind);
            })}
      </div>
      <div className="ui bottom attached button">
        <Link
          to={{ pathname: `/Main/${match.params.type}&${match.params.userID}` }}
          className="ui button blue match-buttons"
        >
          Back To Main Page
        </Link>
      </div>
    </div>
  );
};

export default OrderTracker;
