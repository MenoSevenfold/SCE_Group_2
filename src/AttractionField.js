import React, { useState, useEffect } from "react";
import ImageUploader                  from "react-images-upload";
import axios                          from "axios";
import { getURL }                     from 'src/utilities'

const AttractionField = ({ discount, attractionData }) => {
  const [attractionImgFile, setAttractionImgFile] = useState(null);

  const [attractionName, setAttractionName] = useState("");
  const [attractionPrice, setAttractionPrice] = useState();

  const [attractionDiscount, setAttractionDiscount] = useState();
  const [attractionID, setAttractionID] = useState();
  useEffect(() => {
    if (attractionData !== undefined) {
      setAttractionName(attractionData.name);
      setAttractionPrice(attractionData.price);
      setAttractionDiscount(attractionData.discount);
      setAttractionID(attractionData._id);
      axios({
        url: attractionData.picture,
        method: "GET",
        responseType: "blob",
      }).then((res) => setAttractionImgFile(res.data));
    }
  }, [attractionData]);

  const onDropImgAttraction = (picture) => {
    setAttractionImgFile(picture[0]);
  };

  return (
    <div className="field attraction_fields" attractionid={`${attractionID}`}>
      <input
        form="fakeForm"
        value={attractionName}
        onChange={(event) => setAttractionName(event.target.value)}
        type="text"
        name={`attraction_name`}
        placeholder="Attraction Name"
      />
      <input
        form="fakeForm"
        value={attractionPrice}
        onChange={(event) => setAttractionPrice(event.target.value)}
        type="number"
        name={`attraction_price`}
        placeholder="Attraction Price"
      />
      <input
        form="fakeForm"
        value={attractionDiscount}
        onChange={(event) => setAttractionDiscount(event.target.value)}
        type="number"
        name={`attraction_discount`}
        placeholder="Attraction Percentage Discount"
      />
      {attractionImgFile !== null ? (
        <img
          alt="Media Content"
          height="200px"
          width="200px"
          src={
            typeof imgFile === "string"
              ? attractionImgFile
              : getURL(attractionImgFile)
          }
        ></img>
      ) : null}

      <ImageUploader
        name={`attraction_image`}
        withIcon={false}
        buttonText="Choose attraction image"
        onChange={onDropImgAttraction}
        singleImage={true}
        imgExtension={[".jpg", ".gif", ".png"]}
        maxFileSize={5242880}
        form="fakeForm"
      />
    </div>
  );
};

export default AttractionField;
