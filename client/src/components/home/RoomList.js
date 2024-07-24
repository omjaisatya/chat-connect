import React from "react";
import Room from "./Room";
import { Link } from "react-router-dom";

const RoomList = ({ rooms }) => {
  return (
    <div className="container mt-4">
      <div className="row">
        {rooms &&
          rooms.map((room) => (
            <div
              className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3"
              key={room._id}
            >
              <Link
                to={`/chat/${room._id}/${room.name}`}
                className="text-decoration-none"
              >
                <Room name={room.name} />
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RoomList;
