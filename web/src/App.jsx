import { useState, useEffect, createContext } from 'react';
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Login from "./views/Login.jsx";
import AdminPanel from "./views/AdminPanel.jsx";
import './App.css';

export const CurrentUserContext = createContext(null);

function App() {
  const [message, setMessage] = useState("");
    //localStorage.setItem("token", "Tom");

    const isAuth = localStorage.getItem("token");

    const [currentUser, setCurrentUser] = useState(isAuth);

  // const getMessage = async () => {
  //   const response = await fetch("http://localhost:3000");
  //   const data = await response.json();
  //   console.log(data);
  //   setMessage(data.message);
  // };

  // useEffect(() => {
  //   getMessage();
  // },[]);

  return (
    <>
      <BrowserRouter>
      <CurrentUserContext.Provider
      value={{
        currentUser,
        setCurrentUser
      }}
    >
        <Routes>
          <Route path="/" element={currentUser ? <Navigate to="/home" />: <Login />} />
          <Route
            path="/home"
            element={currentUser ? <AdminPanel /> : <Navigate to="/" />}
          />
        </Routes>
        </CurrentUserContext.Provider>
      </BrowserRouter>
    </>
  )
}

export default App
