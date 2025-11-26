import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = login(username, password);
    if (result.ok) {
      navigate("/");
    } else {
      setError(result.message);
    }
  };

  return (
    <main className="loginContainer">
      <h1 className="loginTitle">Iniciar sesión</h1>

      <form className="loginForm" onSubmit={handleSubmit}>
        <label className="loginLabel">
          Usuario
          <input
            className="loginInput"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="admin"
          />
        </label>

        <label className="loginLabel">
          Contraseña
          <input
            className="loginInput"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="1234"
          />
        </label>

        {error && <p className="loginError">{error}</p>}

        <button className="loginButton" type="submit">
          Entrar
        </button>
      </form>
    </main>
  );
};
