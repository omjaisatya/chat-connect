import React from "react";
import { icons } from "../../icons/Icons";

const Room = ({ name }) => {
  return (
    <div className="card horizontal">
      <div className="card-stacked">
        <div className="card-content">
          <p>{name}</p>
          <icons.Room />
        </div>
      </div>
    </div>
  );
};

export default Room;
