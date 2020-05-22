import React from "react";
import Modal from "react-modal";
import AttractionCard from "./AttractionCard";

const AttractionsView = ({ attractionsList, ...props }) => {
  Modal.setAppElement("#root");

  return (
    <Modal {...props}>
      <div style={{ maxHeight: "50vh" }}>
        <div style={{ cursor: "pointer" }} onClick={() => props.closeModal()}>
          <i className="close icon"></i>
        </div>
        <div className="ui link cards">
          {attractionsList.map((attraction, index) => {
            return <AttractionCard key={index} attraction={attraction} />;
          })}
        </div>
        <div></div>
      </div>
    </Modal>
  );
};

export default AttractionsView;
