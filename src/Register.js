import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { server } from "./api";
import ImageUploader from "react-images-upload";
import axios from "axios";

const Register = () => {
  const [userType, setUserType] = useState("tenant");
  const [imgFile, setImgFile] = useState(null);

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
    let imageData = new FormData();
    imageData.append("image", imgFile);
    axios
      .post("https://api.imgur.com/3/image", imageData, {
        headers: {
          Authorization: `Client-ID 1df0cefcf599ac8`,
          Accept: "application/json",
        },
      })
      .then((res) => {
        formData.studentCard = res.data.data.link;
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
      })
      .catch((err) => alert("You have to upload image"));
  };

  const onDrop = (picture) => {
    setImgFile(picture[0]);
  };
  const getURL = (imgFile) => {
    var urlCreator = window.URL || window.webkitURL;
    var imageUrl = urlCreator.createObjectURL(imgFile);
    return imageUrl;
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
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
