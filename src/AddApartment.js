import React from "react";
import { server } from "./api";
import axios from "axios";

import { useHistory }           from "react-router-dom";
import ApartmentForm            from "./ApartmentForm";
import { createDictionaryForm } from 'src/utilities'

const AddApartment = ({ match }) => {
  let history = useHistory();

  const addAttraction = async (attractionObject) => {
    return server
      .post("/add_attraction", attractionObject)
      .then((res) => {
        const attractionID = res.data;
        return attractionID;
      })
      .catch((err) => alert(err.request.responseText));
  };
  const createAttractionsList = async (event) => {
    let attractionList = [
      ...event.target.querySelectorAll(".attraction_fields"),
    ].map(async (e, i) => {
      const imageData = new FormData();
      const attractionImageFile = e.querySelector("[name=attraction_image]")
        .files[0];
      imageData.append("image", attractionImageFile);
      return axios
        .post("https://api.imgur.com/3/image", imageData, {
          headers: {
            Authorization: `Client-ID 1df0cefcf599ac8`,
            Accept: "application/json",
          },
        })
        .then(async (res) => {
          const attractionObject = {};

          attractionObject.picture = res.data.data.link;
          attractionObject.name = e.querySelector(
            "[name=attraction_name]"
          ).value;
          attractionObject.price = e.querySelector(
            "[name=attraction_price]"
          ).value;

          const attractionID = await addAttraction(attractionObject);
          const discount = e.querySelector("[name=attraction_discount]").value;

          return { attractionID, discount };
        })
        .catch((err) => {
          throw Error(
            "You must upload an image to attraction number " + (i + 1)
          );
        });
    });
    attractionList = await Promise.all(attractionList);
    return attractionList;
  };

  const submitForm = async (event) => {
    event.preventDefault();
    let formData = createDictionaryForm(event);
    delete formData["attraction_image"];
    delete formData[""];
    const apartmentImageFile = event.target.querySelector(
      "[name=apartment_image]"
    ).files[0];

    createAttractionsList(event)
      .then((data) => {
        if (data === undefined) {
          throw Error("You must fill all fields");
        }
        formData.attractions = data;
        formData.owner = match.params.userID;
        formData.ordered = false;
        formData.rating = 0;
        formData.raters = 0;
        let imageData = new FormData();
        imageData.append("image", apartmentImageFile);
        axios
          .post("https://api.imgur.com/3/image", imageData, {
            headers: {
              Authorization: `Client-ID 1df0cefcf599ac8`,
              Accept: "application/json",
            },
          })
          .then((res) => {
            formData.picture = res.data.data.link;
            server
              .post("/add_apartment", formData)
              .then(function (response) {
                console.log(response);
                history.push(
                  `/Main/${match.params.type}&${match.params.userID}`
                );
              })
              .catch(function (error) {
                alert(error.request.responseText);
              });
          })
          .catch((err) => alert("You must upload an image to apartment"));
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <ApartmentForm submitForm={submitForm} currentUser={match.params.userID} />
  );
};

export default AddApartment;
