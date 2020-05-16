import React from "react";
import { server } from "./api";
import axios from "axios";

import { useHistory } from "react-router-dom";
import ApartmentForm from "./ApartmentForm";

const AddApartment = ({ match }) => {
  let history = useHistory();

  const createDictionaryForm = ({ target }) => {
    let details = {};
    for (let i = 0; target[i].type !== "submit"; i++) {
      let name = target[i].name;
      let value = target[i].value;
      details[name] = value;
    }
    return details;
  };
  const submitForm = async (event, imageFile) => {
    event.preventDefault();
    let formData = createDictionaryForm(event);
    formData.owner = match.params.userID;
    formData.ordered = false;
    formData.rating = 0;
    formData.raters = 0;
    let imageData = new FormData();
    imageData.append("image", imageFile);
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
            history.push(`/Main/${match.params.type}&${match.params.userID}`);
          })
          .catch(function (error) {
            alert(error.request.responseText);
          });
      })
      .catch((err) => alert(err.request.responseText));
  };

  return (
    <ApartmentForm submitForm={submitForm} currentUser={match.params.userID} />
  );
};

export default AddApartment;
