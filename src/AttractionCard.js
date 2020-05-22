import React, { useEffect, useState } from "react";
import { server } from "./api";

const AttractionCard = ({ attraction }) => {
  const [attractionDetails, setAttractionDetails] = useState({});

  useEffect(() => {
    const fetch = async () => {
      server
        .get("/get_attraction", {
          params: { attractionID: attraction.attractionID },
        })
        .then((res) => {
          setAttractionDetails(res.data);
        });
    };
    fetch();
  }, [attraction]);

  return (
    <div className="card" style={{ cursor: "inherit" }}>
      <div className="image">
        <img alt="attraction" src={attractionDetails.picture} />
      </div>
      <div className="content">
        <div className="header">{attractionDetails.name}</div>
        <div className="description">
          <div>
            <b>Price: {attractionDetails.price}(ILS)</b>
          </div>
          <div style={{ color: "green" }}>
            <b>
              After {attraction.discount}% Discount:{" "}
              {attractionDetails.price -
                attractionDetails.price * (attraction.discount / 100)}
              (ILS)
            </b>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttractionCard;
