function Message({ text, user, currentUser }) {
  const isOwnMessage = user === currentUser;

  return (
    <div className={isOwnMessage ? "message own" : "message"}>
      <p>{text}</p>
    </div>
  );
}

export default Message;
