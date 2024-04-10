import { useState } from "react";
import style from "./Home.module.css";
import { useNavigate } from "react-router-dom";

export default function Home(props) {
  const navigate = useNavigate();

  const [user, setUser] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("user", user);
    props.socket.emit("newUser", { user, socketID: props.socket.id });
    navigate("/chat");
  };

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <h2 className={style.title}>Вход в чат</h2>
      <input
        value={user}
        onChange={(e) => {
          setUser(e.target.value);
        }}
        placeholder='Введите имя...'
        type='text'
      />
      <button>Войти</button>
    </form>
  );
}
