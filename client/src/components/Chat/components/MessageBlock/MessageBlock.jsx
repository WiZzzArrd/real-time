import { useState } from "react";
import style from "./messageblock.module.css";

export default function MessageBlock({ socket }) {
  const [message, setMessage] = useState("");

  const isTyping = () =>
    socket.emit("typing", `${localStorage.getItem("user")} печатает...`);

  const sendMessage = (e) => {
    e.preventDefault();

    if (message.trim() && localStorage.getItem("user")) {
      socket.emit("message", {
        text: message,
        name: localStorage.getItem("user"),
        id: `${socket.id}`,
        socketID: socket.id,
      });
    }

    setMessage("");
  };

  return (
    <div className={style.messageblock}>
      <form onSubmit={sendMessage} className={style.inputblock}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={isTyping}
          placeholder='Введите сообщение...'
          type='text'
        />
        <button type='submit'>Отправить</button>
      </form>
    </div>
  );
}
