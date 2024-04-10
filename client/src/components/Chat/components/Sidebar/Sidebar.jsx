import { useEffect, useState } from "react";
import style from "./sidebar.module.css";

export default function Sidebar({ socket }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    socket.on("responseNewUser", (data) => {
      setUsers(data);
    });

    setLoading(false);
  }, [users, socket]);

  const filteredList = users.filter((value, index, self) => {
    return (
      index ===
      self.findIndex((t) => {
        return t.user === value.user && t.socketID === value.socketID;
      })
    );
  });

  return (
    <aside className={style.sidebar}>
      <h3 className={style.title}>Пользователи</h3>

      <ul className={style.users}>
        {filteredList.map((element) => {
          return (
            <li key={element.socketID} className={style.user}>
              <a href='#'> {element.user}</a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
