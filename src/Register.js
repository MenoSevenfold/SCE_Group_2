import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { server } from "./api";

const Register = () => {
  const [userType, setUserType] = useState("tenant");
  const history = useHistory();
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
    server
      .post("/register_request", formData)
      .then(function (response) {
        console.log(response);
        alert("Register Successful");
        history.push(`/`);
      })
      .catch((error) => {
        alert(error.request.responseText);
      });
  };
  return (
    <div className="ui container segment">
      <form className="ui form" onSubmit={submitForm}>
        <div className="field">
          <label>Username</label>
          <input type="text" name="username" placeholder="Username" />
        </div>
        <div className="field">
          <label>Password</label>
          <input type="password" name="password" placeholder="Password" />
        </div>
        <div className="field">
          <label>Type:</label>
          <select
            name="type"
            value={userType}
            onChange={(event) => setUserType(event.target.value)}
          >
            <option value={"landlord"}>landlord</option>
            <option value={"tenant"}>tenant</option>
          </select>
        </div>
        <button className="ui button" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
