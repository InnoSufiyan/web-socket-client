import logo from "./logo.svg";
import "./App.css";
import { io } from "socket.io-client";
import { useEffect, useMemo, useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [room, setRoom] = useState("");
  const [createRoom, setCreateRoom] = useState("");
  const [socketID, setSocketID] = useState("");
  const socket = useMemo(() => io("http://localhost:3000"), []);

  const sendMessage = () => {
    socket.emit("message", { data: text, room });
  };
  const createRoomHandler = () => {
    socket.emit("create-room", createRoom);
  };
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server", socket.id);
      setSocketID(socket.id);
    });
    socket.on("me", (data) => {
      console.log("Me", data);
    });
    socket.on("new-user", (data) => {
      console.log("New user", data);
    });
    socket.on("message", (data) => {
      console.log("Message", data);
    });
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <h4>Socket.io id --- {socketID}</h4>
        <input
          type="text"
          placeholder="Enter any message"
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter any Room"
          onChange={(e) => setRoom(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
        <input
          type="text"
          placeholder="Create any Room"
          onChange={(e) => setCreateRoom(e.target.value)}
        />
        <button onClick={createRoomHandler}>Create</button>
      </header>
    </div>
  );
}

export default App;
