import { Route, Routes, useNavigate } from "react-router-dom";
import socketIO from "socket.io-client";
import Home from "./components/Home/Home";
import Chat from "./components/Chat/Chat";
import NotFound from "./components/NotFound/NotFound";
import { useEffect } from "react";

const socket = socketIO.connect("http://localhost:5000");

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
      // socket.emit("reload");
      navigate("/");
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path='/' element={<Home socket={socket} />}></Route>
        <Route path='/chat' element={<Chat socket={socket} />}></Route>
        <Route path='*' element={<NotFound></NotFound>}></Route>
      </Routes>
    </>
  );
}

export default App;
