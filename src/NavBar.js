import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ OrderBy, myOrdersButton }) => {
  return (
    <div
      className="ui secondary menu"
      style={{ backgroundColor: "white", width: 100 + "%" }}
    >
      <div className="item">
        <label>Order By:</label>
        <select
          onChange={(event) => OrderBy(event.target.value)}
          className="inputs"
          name="country"
          style={{ border: "0px solid white" }}
        >
          <option key="palce" value="place">
            Place
          </option>
          <option key="price" value="price">
            Price
          </option>
          <option key="rooms" value="rooms">
            Rooms
          </option>
          <option key="rating" value="rating">
            Rating
          </option>
        </select>
        {myOrdersButton}
        <Link to={{ pathname: `/` }}>Logout</Link>
      </div>
    </div>
  );
};

export default NavBar;
