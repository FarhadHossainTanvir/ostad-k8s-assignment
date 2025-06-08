import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = () => {
    socket.emit("send_message", { message });
    setChat([...chat, { message }]);
    setMessage("");
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setChat((prev) => [...prev, data]);
    });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Simple Chat</h2>
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
      <ul>
        {chat.map((msg, idx) => (
          <li key={idx}>{msg.message}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
