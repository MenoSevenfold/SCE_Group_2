import React from "react";

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
        </select>
        {myOrdersButton}
      </div>
    </div>
  );
};

export default NavBar;
