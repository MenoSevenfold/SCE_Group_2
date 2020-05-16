import React, { useState } from "react";
import { Rating } from "semantic-ui-react";
import { server } from "./api";

const ApartmentCard = ({ apartment, button, currentUser }) => {
  const [currentRate, setCurrentRate] = useState(
    apartment.rating / (apartment.raters === 0 ? 1 : apartment.raters)
  );
  const rateApartment = (e, data) => {
    console.log(data.rating);
    const rateData = {
      apartmentID: apartment._id,
      raters: apartment.raters + 1,
      rating: apartment.rating + data.rating,
    };
    server
      .post("/apartment_update", rateData)
      .then(function (response) {
        console.log(response);

        setCurrentRate(
          rateData.rating / (apartment.raters === 0 ? 1 : apartment.raters + 1)
        );
      })
      .catch(function (error) {
        alert(error.request.responseText);
      });
  };
  return (
    <div className="ui card">
      <div className="content">
        <div className="header">
          <label>Owner: </label>
          {apartment.name}
        </div>
        <div className="header">
          <label>Phone: </label>
          {apartment.phone}
        </div>
        <div className="header">
          <label>Place: </label>
          {apartment.location}
        </div>
        <div className="header">
          <label>Rooms: </label>
          {apartment.rooms}
        </div>
        <div className="header">
          <label>Date Limit: </label>
          {apartment.dateLimit} Days
        </div>
        <div className="header">
          <label>Price For Month: </label>
          {apartment.price}
        </div>
        <div className="header">
          <label>Information: </label>
          {apartment.info}
        </div>
        <div className="header">
          <label>Available: </label>
          {apartment.ordered ? (
            <span className="ui" style={{ color: "red" }}>
              <b>No</b>
            </span>
          ) : (
            <span className="ui" style={{ color: "green" }}>
              <b>Yes</b>
            </span>
          )}
        </div>
        <div className="header">
          {currentRate.toFixed(2)}
          {currentUser === apartment.owner ? (
            <Rating
              icon="star"
              rating={`${currentRate}`}
              maxRating={5}
              disabled
            />
          ) : (
            <Rating
              onRate={rateApartment}
              icon="star"
              rating={`${currentRate}`}
              maxRating={5}
            />
          )}
        </div>
        {button}
      </div>
    </div>
  );
};

export default ApartmentCard;
