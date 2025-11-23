import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import "./styles.css";

function Login({ setUser }) {
  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="login-container">
      <h2>Realtime Chat</h2>
      <button onClick={signIn} className="google-btn">
        Sign in with Google
      </button>
    </div>
  );
}

export default Login;
