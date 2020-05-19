import React, { useState, useEffect } from "react";
import ImageUploader from "react-images-upload";

const AttractionField = ({ apartmentData }) => {
  const [attractionImgFile, setAttractionImgFile] = useState(null);

  const [attractionName, setAttractionName] = useState("");
  const [attractionPrice, setAttractionPrice] = useState();
  const [attractionDiscount, setAttractionDiscount] = useState();

  useEffect(() => {
    if (apartmentData !== undefined) {
      console.log(apartmentData.attractions);
    }
  }, [apartmentData]);

  const onDropImgAttraction = (picture) => {
    setAttractionImgFile(picture[0]);
  };

  const getURL = (imgFile) => {
    var urlCreator = window.URL || window.webkitURL;
    var imageUrl = urlCreator.createObjectURL(imgFile);
    return imageUrl;
  };

  return (
    <div className="field attraction_fields">
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
