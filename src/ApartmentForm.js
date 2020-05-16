import React, { useState, useEffect } from "react";
import ImageUploader from "react-images-upload";
import axios from "axios";

const ApartmentForm = ({ submitForm, apartmentData }) => {
  const [apartmentOwnerName, setApartmentOwnerName] = useState();
  const [apartmentPhone, setApartmentPhone] = useState();
  const [apartmentLocation, setApartmentLocation] = useState();
  const [apartmentPrice, setApartmentPrice] = useState();
  const [apartmentRooms, setApartmentRooms] = useState();
  const [dateLimit, setDateLimit] = useState();
  const [apartmentDescription, setApartmentDescription] = useState();
  const [imgFile, setImgFile] = useState(null);

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
      axios({
        url: apartmentData.picture,
        method: "GET",
        responseType: "blob",
      }).then((res) => setImgFile(res.data));
      setSubmitButtonName("Save");
    }
  }, [apartmentData]);

  const onDrop = (picture) => {
    setImgFile(picture[0]);
  };
  const getURL = (imgFile) => {
    var urlCreator = window.URL || window.webkitURL;
    var imageUrl = urlCreator.createObjectURL(imgFile);
    return imageUrl;
  };
  const createForm = () => {
    return (
      <div>
        <form
          className="ui form"
          onSubmit={(event) => submitForm(event, imgFile)}
        >
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
          <div className="field">
            {imgFile !== null ? (
              <img
                alt="Media Content"
                height="200px"
                width="200px"
                src={typeof imgFile === "string" ? imgFile : getURL(imgFile)}
              ></img>
            ) : null}

            <ImageUploader
              name="image"
              withIcon={false}
              buttonText="Choose images"
              onChange={onDrop}
              singleImage={true}
              imgExtension={[".jpg"]}
              maxFileSize={5242880}
            />
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
