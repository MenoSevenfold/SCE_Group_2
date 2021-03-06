import React, { useEffect, useState } from "react";
import { server } from "./api";
import { useHistory } from "react-router-dom";
import ApartmentCard from "./ApartmentCard";
import { differenceInCalendarDays } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

import DatePicker               from "react-datepicker";
import AttractionOrderCard      from "./AttractionOrderCard";
import { createDictionaryForm } from 'src/utilities'

const OrderApartment = ({ match }) => {
  let history = useHistory();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [apartment, setApartment] = useState({ attractions: [] });
  const [attractionsList, setAttractionsList] = useState([]);
  const [attractionsPrice, setAttractionsPrice] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      server
        .get("/get_apartment", {
          params: { apartmentID: match.params.apartmentID },
        })
        .then((res) => {
          setApartment(res.data);
        });
    };
    fetch();
  }, [match]);

  useEffect(() => {
    const fetch = async () => {
      let newAttractionsList = apartment.attractions.map(async (attraction) => {
        return server
          .get("/get_attraction", {
            params: { attractionID: attraction.attractionID },
          })
          .then((res) => {
            return { ...res.data, discount: attraction.discount };
          });
      });
      newAttractionsList = await Promise.all(newAttractionsList);
      setAttractionsList([...newAttractionsList]);
    };
    fetch();
  }, [apartment]);

  const makeAnOrder = (event) => {
    event.preventDefault();
    let formData = createDictionaryForm(event);
    formData.renterName = formData.name;
    delete formData["name"];
    formData.apartmentOwner = apartment.owner;
    formData.apartmentID = match.params.apartmentID;
    formData.renterID = match.params.userID;
    formData.purchaseDate = new Date();
    if (
      differenceInCalendarDays(
        new Date(formData.toDate),
        new Date(formData.fromDate)
      ) > apartment.dateLimit
    ) {
      alert("The owner not alow to rent for this days range");
      return;
    }
    if (new Date(formData.toDate) < new Date(formData.fromDate)) {
      alert("The end date cant be less then start date");
      return;
    }
    server
      .post("/order_apartment", formData)
      .then(function (response) {
        const dataToUpdate = {
          apartmentID: formData.apartmentID,
          ordered: true,
        };
        server
          .post("/apartment_update", dataToUpdate)
          .then(function (response) {
            console.log(response);
            history.push(`/Main/${match.params.type}&${match.params.userID}`);
          })
          .catch(function (error) {
            alert(error.request.responseText);
          });
      })
      .catch(function (error) {
        alert(error.request.responseText);
      });
  };

  const createApartmentCard = (apartment) => {
    return <ApartmentCard apartment={apartment} />;
  };

  const calcDatePrice = () => {
    let price = 0;
    const priceForDay = apartment.price / 30;
    const days = differenceInCalendarDays(
      new Date(endDate),
      new Date(startDate)
    );
    if (days > 0) {
      price += priceForDay * days;
      return price;
    }
    return 0;
  };

  const calcAttractionPrice = (attractionPrice) => {
    setAttractionsPrice(attractionsPrice + attractionPrice);
  };

  const calcPrice = () => {
    return calcDatePrice() + attractionsPrice;
  };

  const renderAttractionsList = () => {
    return (
      <div className="ui link cards">
        {attractionsList.map((attraction, index) => {
          return (
            <AttractionOrderCard
              key={index}
              attraction={attraction}
              calcPrice={calcAttractionPrice}
            />
          );
        })}
      </div>
    );
  };

  const orderForm = () => {
    return (
      <form className="ui form" onSubmit={makeAnOrder}>
        <div className="field">
          <label>Name</label>
          <input type="text" name="name" placeholder="Name" />
        </div>
        <div className="field">
          <label>Credit Number</label>
          <input type="number" name="credit" placeholder="Name" />
        </div>
        <div className="field">
          <label>Pick a date</label>
          <DatePicker
            name="fromDate"
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
            }}
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
          />
          <DatePicker
            name="toDate"
            selected={endDate}
            onChange={(date) => {
              setEndDate(date);
            }}
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
          />
        </div>
        {renderAttractionsList()}
        <div
          className="field"
          style={{
            border: "2px solid green",
            borderRadius: "15px",
            marginTop: "10px",
          }}
        >
          <label>Final Price: {calcPrice()}</label>
        </div>
        <button className="ui button" type="submit">
          Order
        </button>
      </form>
    );
  };

  const displayApartment = (apartment) => {
    return (
      <div
        className="ui container"
        style={{ paddingBottom: "5%", paddingTop: "5%" }}
      >
        <div className="ui cards">{createApartmentCard(apartment)}</div>
        <div>{orderForm()}</div>
      </div>
    );
  };
  return (
    <div>{apartment !== undefined ? displayApartment(apartment) : null}</div>
  );
};

export default OrderApartment;
