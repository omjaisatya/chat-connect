import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../userContext";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

const ENDPT = "localhost:5000";
let socket;

const Chat = () => {
  const { user } = useContext(UserContext);
  let { room_id, room_name } = useParams();
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

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <h6>
          Your Room Id is : <span style={{ color: "#180161" }}>{room_id}</span>
        </h6>{" "}
        <h6>
          Your Room Name is:
          <span style={{ color: "#4F1787" }}>{room_name}</span>{" "}
        </h6>
      </div>
      <h3>Your name : {JSON.stringify(user.name)}</h3>
      {/* <pre>{JSON.stringify(messages, null, "\t")}</pre> */}
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <h4>
              {msg.name}: {msg.text}{" "}
            </h4>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default Chat;
