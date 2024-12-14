import React, { useEffect, useContext } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

//=====Import Components=====
import { AuthContext, FirebaseContext } from './store/Context';
import Home from './Pages/Home';
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Create from './Pages/Create'
import ViewPost from './Pages/ViewPost';
import Post from './store/PostContext';

function App() {

  const { setUser } = useContext(AuthContext)
  const { firebase } = useContext(FirebaseContext)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user)
    })


  })
  return (
    <Post>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<Create />} />
          <Route path="/view" element={<ViewPost />} />

        </Routes>
      </BrowserRouter>
    </Post>
  );
}


export default App;
