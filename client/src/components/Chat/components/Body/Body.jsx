import style from "./body.module.css";
import MessageBlock from "../MessageBlock/MessageBlock";
import { useNavigate } from "react-router-dom";
import background from "../../../../assets/background.png";

export default function Body({ socket, messages, status }) {
  const navigate = useNavigate();

  const handleLeave = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  if (messages.length === 0) {
    return (
      <div className={style.empty}>
        <header className={style.header}>
          <button onClick={handleLeave} className={style.btn}>
            Покинуть чат
          </button>
        </header>
        <h4>Тут пусто... Смелей пиши первым!</h4>

        <img src={background} alt='' />

        <MessageBlock socket={socket}></MessageBlock>
      </div>
    );
  }

  let messagesData = messages.map((item) => {
    if (item.name === localStorage.getItem("user")) {
      return (
        <div key={item.id} className={style.recipient}>
          <p className={style.name}>Вы</p>
          <p>{item.text}</p>
        </div>
      );
    } else {
      return (
        <div key={item.id} className={style.sender}>
          <p className={style.name}>{item.name}</p>
          <p>{item.text}</p>
        </div>
      );
    }
  });

  return (
    <main className={style.main}>
      <header className={style.header}>
        <button onClick={handleLeave} className={style.btn}>
          Покинуть чат
        </button>
      </header>

      <div className={style.container}>
        {messagesData}

        <p className={style.typing}>{status}</p>
        <MessageBlock socket={socket}></MessageBlock>
      </div>
    </main>
  );
}
