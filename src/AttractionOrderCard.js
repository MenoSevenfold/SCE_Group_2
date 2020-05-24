import React from "react";
import AttractionCard from "./AttractionCard";

const AttractionOrderCard = ({ attraction, calcPrice }) => {
  const [ordered, setOrdered] = React.useState(false);

  return (
    <div
      style={{
        display: "flex",
        margin: "10px 10px",
        border: "1px solid black",
      }}
    >
      <div style={{ textAlign: "center", position: "relative" }}>
        {ordered ? (
          <div
            style={{
              backgroundColor: `rgba(0,255,89,0.49)`,
              width: "100%",
              height: "100%",
              position: "absolute",
              zIndex: 0,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "10%",
                fontWeight: "bolder",
                fontSize: "xx-large",
                textAlign: "center",
              }}
            >
              Purchased
            </div>
            <button
              className="ui button red"
              onClick={(e) => {
                e.preventDefault();
                setOrdered(false);
                calcPrice(-attraction.price);
              }}
            >
              Cancel Attraction
            </button>
          </div>
        ) : null}

        <AttractionCard attractionDetails={{ ...attraction }} />
        <button
          className="ui button green"
          style={{ margin: "2%" }}
          onClick={(e) => {
            e.preventDefault();
            setOrdered(true);
            calcPrice(attraction.price);
          }}
        >
          Order Attraction
        </button>
      </div>
    </div>
  );
};

export default AttractionOrderCard;
