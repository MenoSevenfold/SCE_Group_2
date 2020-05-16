import React from "react";
import { server } from "./api";
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
  const submitForm = async (event) => {
    event.preventDefault();
    let formData = createDictionaryForm(event);
    formData.owner = match.params.userID;
    formData.ordered = false;
    formData.rating = 0;
    formData.raters = 0;

    server
      .post("/add_apartment", formData)
      .then(function (response) {
        console.log(response);
        history.push(`/Main/${match.params.type}&${match.params.userID}`);
      })
      .catch(function (error) {
        alert(error.request.responseText);
      });
  };

  return (
    <ApartmentForm submitForm={submitForm} currentUser={match.params.userID} />
  );
};

export default AddApartment;
