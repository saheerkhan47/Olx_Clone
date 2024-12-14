import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../../store/Context';
import Logo from '../../olx-logo.png';
import './Login.css';
import { useNavigate } from 'react-router-dom';


function Login() {

  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { firebase } = useContext(FirebaseContext);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }
    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        nav('/')
      })
      .catch((error) => {
        console.error(error.message);
        alert('Failed to log in. Please check your credentials.');
      });
  };

  return (
    <div className="loginParentDiv">
      <img width="200px" height="200px" src={Logo} alt="OLX Logo" />
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <br />
        <input
          className="input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          name="email"
          placeholder="Enter your email"
        />
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input
          className="input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          name="password"
          placeholder="Enter your password"
        />
        <br />
        <br />
        <button type="submit">Login</button>
      </form>
      <a href="/signup">Signup</a>
    </div>
  );
}

export default Login;
