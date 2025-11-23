import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  orderBy,
  query,
} from "firebase/firestore";
import Message from "./Message";
import "./styles.css";

function ChatRoom({ user }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const messagesRef = collection(db, "messages");

  useEffect(() => {
    const q = query(messagesRef, orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setMessages(msgs);
    });
    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (message.trim() === "") return;

    await addDoc(messagesRef, {
      text: message,
      user: user.uid,
      createdAt: serverTimestamp(),
    });

    setMessage("");
  };

  return (
    <div className="chat-container">
      <h3>Chat Room</h3>
      <button className="logout" onClick={() => auth.signOut()}>
        Logout
      </button>

      <div className="messages-box">
        {messages.map((msg) => (
          <Message
            key={msg.id}
            text={msg.text}
            user={msg.user}
            currentUser={user.uid}
          />
        ))}
      </div>

      <div className="input-box">
        <input
          type="text"
          placeholder="Message..."
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatRoom;
