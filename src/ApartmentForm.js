import React, { useState, useEffect } from "react";

const ApartmentForm = ({ submitForm, apartmentData }) => {
  const [apartmentOwnerName, setApartmentOwnerName] = useState();
  const [apartmentPhone, setApartmentPhone] = useState();
  const [apartmentLocation, setApartmentLocation] = useState();
  const [apartmentPrice, setApartmentPrice] = useState();
  const [apartmentRooms, setApartmentRooms] = useState();
  const [dateLimit, setDateLimit] = useState();
  const [apartmentDescription, setApartmentDescription] = useState();

  const [submitButtonName, setSubmitButtonName] = useState("Add");

  useEffect(() => {
    if (apartmentData !== undefined) {
      setApartmentOwnerName(apartmentData.name);
      setApartmentPhone(apartmentData.phone);
      setApartmentLocation(apartmentData.location);
      setApartmentPrice(apartmentData.price);
      setApartmentRooms(apartmentData.rooms);
      setApartmentDescription(apartmentData.info);
      setDateLimit(apartmentData.dateLimit);
      setSubmitButtonName("Save");
    }
  }, [apartmentData]);

  const createForm = () => {
    return (
      <div>
        <form className="ui form" onSubmit={submitForm}>
          <div className="field">
            <label>Name</label>
            <input
              value={apartmentOwnerName}
              onChange={(event) => setApartmentOwnerName(event.target.value)}
              type="text"
              name="name"
              placeholder="Name"
            />
          </div>
          <div className="field">
            <label>Phone</label>
            <input
              value={apartmentPhone}
              onChange={(event) => setApartmentPhone(event.target.value)}
              type="tel"
              name="phone"
              placeholder="Phone"
            />
          </div>
          <div className="field">
            <label>Location</label>
            <input
              value={apartmentLocation}
              onChange={(event) => setApartmentLocation(event.target.value)}
              type="text"
              name="location"
              placeholder="Location"
            />
          </div>

          <div className="field">
            <label>Rooms</label>
            <input
              value={apartmentRooms}
              onChange={(event) => setApartmentRooms(event.target.value)}
              type="number"
              name="rooms"
              placeholder="Rooms"
            />
          </div>
          <div className="field">
            <label>Date Limit(In days): </label>
            <input
              value={dateLimit}
              onChange={(event) => setDateLimit(event.target.value)}
              type="number"
              name="dateLimit"
              placeholder="Date Limit(In days)"
            />
          </div>
          <div className="field">
            <label>Price</label>
            <input
              value={apartmentPrice}
              onChange={(event) => setApartmentPrice(event.target.value)}
              type="number"
              name="price"
              placeholder="Price"
            />
          </div>
          <div className="field">
            <label>Description</label>
            <textarea
              rows="2"
              name="info"
              placeholder="Description"
              value={apartmentDescription}
              onChange={(event) => setApartmentDescription(event.target.value)}
            ></textarea>
          </div>
          <button className="ui button" type="submit">
            {submitButtonName}
          </button>
        </form>
      </div>
    );
  };

  return <div>{createForm()}</div>;
};

export default ApartmentForm;
