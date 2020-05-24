import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { server } from "./api";
import AttractionCard from "./AttractionCard";

const AttractionsView = ({ apartmentAttractionsList, ...props }) => {
  Modal.setAppElement("#root");
  const [attractionsList, setAttractionsList] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      let newAttractionsList = apartmentAttractionsList.map(
        async (attraction) => {
          return server
            .get("/get_attraction", {
              params: { attractionID: attraction.attractionID },
            })
            .then((res) => {
              return { ...res.data, discount: attraction.discount };
            });
        }
      );
      newAttractionsList = await Promise.all(newAttractionsList);
      setAttractionsList([...newAttractionsList]);
    };
    fetch();
  }, [apartmentAttractionsList]);

  return (
    <Modal {...props}>
      <div style={{ maxHeight: "50vh" }}>
        <div style={{ cursor: "pointer" }} onClick={() => props.closeModal()}>
          <i className="close icon"></i>
        </div>
        <div className="ui link cards">
          {attractionsList.map((attraction, index) => {
            return (
              <AttractionCard key={index} attractionDetails={attraction} />
            );
          })}
        </div>
        <div></div>
      </div>
    </Modal>
  );
};

export default AttractionsView;
