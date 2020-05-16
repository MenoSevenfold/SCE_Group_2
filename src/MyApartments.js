import React, { useEffect, useState } from "react";
import { server } from "./api";
import { Link } from "react-router-dom";
import ApartmentCard from "./ApartmentCard";
import NavBar from "./NavBar";

const MyApartments = ({ type, userID }) => {
  const [apartmentList, setApartmentList] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      server
        .get("/get_my_apartments", {
          params: { userID },
        })
        .then((res) => {
          setApartmentList([...res.data]);
        });
    };
    fetch();
  }, [userID]);

  const deleteApartment = async (apartmentID) => {
    server.post("/delete_apartment", { apartmentID }).then((res) => {
      alert("Deletion has been sucessfully");
      server
        .get("/get_my_apartments", {
          params: { userID },
        })
        .then((res) => {
          setApartmentList([...res.data]);
        });
    });
  };
  const createApartmentCard = (apartment, ind) => {
    const attachedButton = (
      <div className="ui bottom attached button">
        <Link
          to={{ pathname: `/Edit/${type}&${userID}&${apartment._id}` }}
          className="ui button blue match-buttons"
        >
          Edit
        </Link>
        <div
          onClick={() => deleteApartment(apartment._id)}
          className="ui red button"
        >
          Delete
        </div>
      </div>
    );
    return (
      <ApartmentCard
        key={ind}
        apartment={apartment}
        button={attachedButton}
        currentUser={userID}
      />
    );
  };
  const emptyApartment = () => {
    return (
      <div className="ui card">
        <div className="content">
          <div className="header">
            <label>You have no apartments</label>
          </div>
        </div>
      </div>
    );
  };
  const orderApartments = (sortyBy) => {
    if (sortyBy === "place") {
      setApartmentList(
        apartmentList.sort((a, b) => (a.place > b.place ? 1 : -1))
      );
    } else {
      setApartmentList(
        apartmentList.sort((a, b) => (a.price > b.price ? 1 : -1))
      );
    }
  };

  const createMyOrdersButton = () => {
    return (
      <Link to={`/MyOrders/${type}&${userID}`} className="item">
        <div>My Orders</div>
      </Link>
    );
  };

  return (
    <div>
      <NavBar
        OrderBy={orderApartments}
        myOrdersButton={createMyOrdersButton()}
      />
      <div className="ui cards">
        {apartmentList.length === 0
          ? emptyApartment()
          : apartmentList.map((apartment, ind) => {
              return createApartmentCard(apartment, ind);
            })}
        <div className="ui card">
          <div className="content">
            <div className="ui bottom attached button">
              <Link
                to={{ pathname: `/AddApartment/${type}&${userID}` }}
                className="ui button blue match-buttons"
              >
                Add new apartment
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyApartments;
