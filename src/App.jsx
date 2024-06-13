import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Player from "./pages/Player/Player";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { ToastContainer } from "react-toastify";

const App = () => {
  const [initialized, setInitialized] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/')
        console.log("Logged In");
      } else {
        navigate('/login');
        console.log("Logged Out");
      }
      setInitialized(true);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <ToastContainer theme="dark" />
      {initialized && (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/player/:id" element={<Player />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
