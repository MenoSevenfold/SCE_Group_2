import React, { useEffect, useState } from "react";
import { server } from "./api";
import { Link } from "react-router-dom";
import ApartmentCard from "./ApartmentCard";
import NavBar from "./NavBar";

const Apartments = ({ userID, type }) => {
  const [apartmentList, setApartmentList] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      server.get("/get_apartments").then((res) => {
        setApartmentList(res.data);
      });
    };
    fetch();
  }, []);

  const orderApartments = (sortyBy) => {
    let newList;
    if (sortyBy === "place") {
      newList = [...apartmentList.sort((a, b) => (a.place > b.place ? 1 : -1))];
    } else if (sortyBy === "price") {
      newList = [...apartmentList.sort((a, b) => (a.price > b.price ? 1 : -1))];
    } else if (sortyBy === "rooms") {
      newList = [...apartmentList.sort((a, b) => (a.rooms > b.rooms ? 1 : -1))];
    } else if (sortyBy === "rating") {
      newList = [
        ...apartmentList.sort((a, b) => {
          const aRating = a.rating / (a.raters === 0 ? 1 : a.raters + 1);
          const bRating = b.rating / (b.raters === 0 ? 1 : b.raters + 1);
          return aRating > bRating ? 1 : -1;
        }),
      ];
    }
    setApartmentList(newList);
  };

  const createApartmentCard = (apartment, ind) => {
    const attachedButton = apartment.ordered ? null : (
      <div className="ui bottom attached button">
        <Link
          to={{ pathname: `/Order/${type}&${userID}&${apartment._id}` }}
          className="ui button blue match-buttons"
        >
          Order
        </Link>
      </div>
    );
    return (
      <ApartmentCard key={ind} apartment={apartment} button={attachedButton} />
    );
  };
  const emptyApartment = () => {
    return (
      <div className="ui card">
        <div className="content">
          <div className="header">
            <label>There is no apartments yet</label>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="ui conatiner">
      <NavBar OrderBy={(sorter) => orderApartments(sorter)} />
      <div className="ui cards">
        {apartmentList.length === 0
          ? emptyApartment()
          : apartmentList.map((apartment, ind) => {
              return createApartmentCard(apartment, ind);
            })}
      </div>
    </div>
  );
};

export default Apartments;
