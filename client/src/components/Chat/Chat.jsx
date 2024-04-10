import style from "./chat.module.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Body from "./components/Body/Body";
import { useEffect, useState } from "react";

export default function Chat({ socket }) {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    socket.on("response", (data) => {
      setMessages([...messages, data]);
    });
  }, [messages, socket]);

  useEffect(() => {
    socket.on("responseTyping", (data) => {
      setStatus(data);

      setTimeout(() => {
        setStatus("");
      }, 1000);
    });
  }, [socket]);

  return (
    <div className={style.chat}>
      <Sidebar socket={socket}></Sidebar>
      <Body messages={messages} socket={socket} status={status}></Body>
    </div>
  );
}
