import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../services/firebase";

export default function Login() {
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Google login failed:", error);
      alert(error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h1>CampusCash</h1>
      <p>Student Budget Tracker</p>

      <button style={styles.button} onClick={handleGoogleLogin}>
        Sign in with Google
      </button>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  button: {
    marginTop: 20,
    padding: "12px 24px",
    fontSize: 16,
    cursor: "pointer",
  },
};
