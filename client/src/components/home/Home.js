import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../userContext";
import { Link } from "react-router-dom";
import RoomList from "./RoomList";
import io from "socket.io-client";
import "./Home.css";

const ENDPT = "localhost:5000";
let socket;

const Home = () => {
  const { user, setUser } = useContext(UserContext);
  const [room, setRoom] = useState("");
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    socket = io(ENDPT);

    socket.on("output-rooms", (rooms) => {
      setRooms(rooms);
    });

    socket.on("room-created", (room) => {
      setRooms((prevRooms) => [...prevRooms, room]);
    });

    return () => {
      socket.disconnect();
      socket.off("output-rooms");
      socket.off("room-created");
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (room.trim()) {
      socket.emit("create-room", room);
      setRoom("");
    }
  };

  const setAsJohn = () => {
    const john = {
      name: "John",
      email: "john@email.com",
      password: "123",
      id: "123",
    };
    setUser(john);
  };

  const setAsTom = () => {
    const tom = {
      name: "Tom",
      email: "tom@email.com",
      password: "456",
      id: "456",
    };
    setUser(tom);
  };

  return (
    <div>
      <div className="row">
        <div className="col s12 m6">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">
                Welcome {user ? user.name : "Guest"}
              </span>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="input-field col s12">
                    <input
                      placeholder="Enter a room name"
                      id="room"
                      type="text"
                      className="validate"
                      value={room}
                      onChange={(e) => setRoom(e.target.value)}
                    />
                    <label htmlFor="room">Room</label>
                  </div>
                </div>
                <button className="btn">Create Room</button>
              </form>
            </div>
            <div className="card-action">
              <a href="#!" onClick={setAsJohn}>
                Set as John
              </a>
              <a href="#!" onClick={setAsTom}>
                Set as Tom
              </a>
            </div>
          </div>
        </div>
        <div className="col s6 m5 offset-1">
          <RoomList rooms={rooms} />
        </div>
      </div>
    </div>
  );
};

export default Home;
