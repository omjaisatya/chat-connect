import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../userContext";
import { useParams, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { icons } from "../../icons/Icons";
import REACT_BASE from "../../config/envConfig";

const ENDPT = REACT_BASE;
let socket;
const MAX_MESSAGE_LENGTH = 200;

const Chat = () => {
  const { user } = useContext(UserContext);
  let { room_id, room_name } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (user) {
      socket = io(ENDPT, {
        transports: ["websocket", "polling"],
        withCredentials: true,
      });

      socket.emit("join", { name: user.name, room_id, user_id: user.id });

      return () => {
        socket.disconnect();
      };
    }
  }, [user, room_id]);

  useEffect(() => {
    if (socket) {
      socket.on("message", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      return () => {
        socket.off("message");
      };
    }
  }, [socket]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, room_id, () => setMessage(""));
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage(event);
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleInputChange = (event) => {
    if (event.target.value.length <= MAX_MESSAGE_LENGTH) {
      setMessage(event.target.value);
    }
  };

  if (!user) {
    return (
      <div className="m-2">
        <button className="btn btn-secondary mb-3" onClick={handleBackClick}>
          <icons.Back />
        </button>
        <span className="p-3">Please set your Name, to show this Room</span>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <button className="btn btn-secondary mb-3" onClick={handleBackClick}>
        <icons.Back />
      </button>
      <div className="mb-3">
        <h6>
          Your Room Id <icons.Id /> :
          <span className="text-primary">{room_id}</span>
        </h6>
        <h6>
          Your Room Name <icons.Room /> :{" "}
          <span className="text-info">{room_name}</span>
        </h6>
      </div>
      <h3>Your name : {JSON.stringify(user.name)}</h3>
      {/* <pre>{JSON.stringify(messages, null, "\t")}</pre> */}
      <div className="messages-container border rounded p-3 mb-3 bg-light">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message p-2 mb-2 rounded ${
              msg.user_id === user.id
                ? "bg-success text-white"
                : "bg-secondary text-white"
            }`}
          >
            <h6>
              <icons.User1 className="text-black" /> {msg.name}: {msg.text}{" "}
            </h6>
          </div>
        ))}
      </div>
      <form className="message-form d-flex mb-4" onSubmit={sendMessage}>
        <textarea
          className="form-control mb-2"
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          rows="3"
          placeholder="Type your message (max 200 characters)"
        ></textarea>
        <div className="d-flex justify-content-between align-items-center m-2">
          <button type="submit" className="btn btn-primary">
            <icons.Send />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
