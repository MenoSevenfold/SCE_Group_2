import React from "react";

const AttractionCard = ({ attractionDetails }) => {
  return (
    <div className="card" style={{ cursor: "inherit" }}>
      <div className="image">
        <img
          alt="attraction"
          src={attractionDetails.picture}
          height="200px"
          width="200px"
        />
      </div>
      <div className="content">
        <div className="header">{attractionDetails.name}</div>
        <div className="description">
          <div>
            <b>Price: {attractionDetails.price}(ILS)</b>
          </div>
          <div style={{ color: "green" }}>
            <b>
              After {attractionDetails.discount}% Discount:{" "}
              {attractionDetails.price -
                attractionDetails.price * (attractionDetails.discount / 100)}
              (ILS)
            </b>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttractionCard;
