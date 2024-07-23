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
        {room_id} {room_name}
      </div>
      <h1>Chat {JSON.stringify(user)}</h1>
      <pre>{JSON.stringify(messages, null, "\t")}</pre>
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
