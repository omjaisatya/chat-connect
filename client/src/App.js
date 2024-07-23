import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserContext } from "./userContext";
import Navbar from "./components/layout/Navbar";
import React, { useState } from "react";
import Home from "./components/home/Home";
import Chat from "./components/chat/Chat";

function App() {
  const [user, setUser] = useState(null);
  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat/:room_id/:room_name" element={<Chat />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
