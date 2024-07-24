import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../userContext";
import { useParams, useNavigate } from "react-router-dom";
import io from "socket.io-client";

const ENDPT = "localhost:5000";
let socket;

const Chat = () => {
  const { user } = useContext(UserContext);
  let { room_id, room_name } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (user) {
      socket = io(ENDPT);
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
  }, []);

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

  if (!user) {
    return (
      <div>
        <button className="btn btn-secondary mb-3" onClick={handleBackClick}>
          Back
        </button>
        <span>Please set your Name, to show this Room</span>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <button className="btn btn-secondary mb-3" onClick={handleBackClick}>
        Back
      </button>
      <div className="mb-3">
        <h6>
          Your Room Id: <span className="text-primary">{room_id}</span>
        </h6>
        <h6>
          Your Room Name: <span className="text-info">{room_name}</span>
        </h6>
      </div>
      <h3>Your name : {JSON.stringify(user.name)}</h3>
      <pre>{JSON.stringify(messages, null, "\t")}</pre>
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
            <h4>
              {msg.name}: {msg.text}{" "}
            </h4>
          </div>
        ))}
      </div>
      <form className="message-form d-flex" onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button type="submit" className="btn btn-primary">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Chat;
