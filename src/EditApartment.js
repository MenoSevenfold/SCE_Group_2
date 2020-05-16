import React, { useEffect, useState } from "react";
import { server } from "./api";
import { useHistory } from "react-router-dom";
import ApartmentForm from "./ApartmentForm";
import axios from "axios";

const EditApartment = ({ match }) => {
  let history = useHistory();

  const [apartment, setApartment] = useState();
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

  const createDictionaryForm = ({ target }) => {
    let details = {};
    for (let i = 0; target[i].type !== "submit"; i++) {
      let name = target[i].name;
      let value = target[i].value;
      details[name] = value;
    }
    return details;
  };
  const submitForm = (event, imageFile) => {
    event.preventDefault();
    let formData = createDictionaryForm(event);

    formData.apartmentID = match.params.apartmentID;
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
          .post("/apartment_update", formData)
          .then(function (response) {
            console.log(response);
            history.push(`/Main/${match.params.type}&${match.params.userID}`);
          })
          .catch(function (error) {
            alert(error.request.responseText);
          });
      });
  };

  return <ApartmentForm submitForm={submitForm} apartmentData={apartment} />;
};

export default EditApartment;
