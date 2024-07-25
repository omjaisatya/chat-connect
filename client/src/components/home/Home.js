import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../userContext";
import RoomList from "./RoomList";
import io from "socket.io-client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import Footer from "../layout/Footer";
import { icons } from "../../icons/Icons";
import REACT_BASE from "../../config/envConfig";

const ENDPT = REACT_BASE;
let socket;

const Home = () => {
  const { user, setUser } = useContext(UserContext);
  const [room, setRoom] = useState("");
  const [rooms, setRooms] = useState([]);
  const [userName, setUserName] = useState("");

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

  const handleUserNameSubmit = (e) => {
    e.preventDefault();
    if (userName.trim()) {
      const newUser = {
        name: userName,
        email: `${userName.toLowerCase()}@example.com`,
        password: "password",
        id: Date.now().toString(),
      };
      setUser(newUser);
      setUserName("");
    }
  };

  return (
    <>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6 col-lg-5">
            <div className="card bg-dark text-light mb-3">
              <div className="card-body">
                <h5 className="card-title">
                  <icons.Welcome /> Welcome {user ? user.name : "Guest"}
                </h5>
                <form onSubmit={handleSubmit} className="mb-3">
                  <div className="mb-3">
                    <label htmlFor="room" className="form-label">
                      Room <icons.Room />
                    </label>
                    <input
                      placeholder="Enter a room name"
                      id="room"
                      type="text"
                      className="form-control"
                      value={room}
                      onChange={(e) => setRoom(e.target.value)}
                    />
                  </div>
                  <button className="btn btn-primary" type="submit">
                    Create Room
                  </button>
                </form>
                <form onSubmit={handleUserNameSubmit}>
                  <div className="mb-3">
                    <label htmlFor="userName" className="form-label">
                      Name <icons.Name />
                    </label>
                    <input
                      placeholder="Enter your name"
                      id="userName"
                      type="text"
                      className="form-control"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                  <button className="btn btn-secondary" type="submit">
                    Set Name
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-7">
            <RoomList rooms={rooms} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
