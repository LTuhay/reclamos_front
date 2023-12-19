import React, { useContext, useState } from "react";
import logo from "../logo.svg";
import LoginService from "../Services/LoginService";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { updateToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");

  function handlerUserChange(event) {
    setUsername(event.target.value);
    console.log(username);
  }

  function handlerPasswordChange(event) {
    setPassword(event.target.value);
  }

  const handleLogin = async (username, password) => {
    const { token } = await LoginService(username, password);

    if (token) {
      updateToken(token);
      navigate("/usersall");
    } else {
      alert("error de logueo");
      navigate("/");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleLogin(username, password);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="username"
              placeholder="Username"
              value={username}
              onChange={handlerUserChange}
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={handlerPasswordChange}
            />
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </header>
    </div>
  );
}

export default Login;
