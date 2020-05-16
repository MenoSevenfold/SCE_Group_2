import React from "react";
import { Link, useHistory } from "react-router-dom";
import { server } from "./api";

const Login = () => {
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
      .post("/login_request", formData)
      .then(function (response) {
        const userCredentials = response.data;
        alert("Login Successful");
        history.push(`/Main/${userCredentials.type}&${userCredentials._id}`);
      })
      .catch((error) => {
        alert(error.request.responseText);
      });
  };
  return (
    <div className="ui container segment">
      <h1 className="ui header">Semi Rom</h1>
      <form className="ui form" onSubmit={submitForm}>
        <div className="field">
          <label>Username</label>
          <input type="text" name="username" placeholder="Username" />
        </div>
        <div className="field">
          <label>Password</label>
          <input type="password" name="password" placeholder="Password" />
        </div>
        <button className="ui button" type="submit">
          Login
        </button>
        <Link to="/Register">
          <button className="ui button">Register</button>
        </Link>
      </form>
    </div>
  );
};

export default Login;
