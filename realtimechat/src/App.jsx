import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import Login from "./components/Login";
import ChatRoom from "./components/ChatRoom";
import "./components/styles.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
  }, []);

  return <div>{user ? <ChatRoom user={user} /> : <Login setUser={setUser} />}</div>;
}

export default App;
