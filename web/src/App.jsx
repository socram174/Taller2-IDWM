import { useState, useEffect, createContext } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Login from "./views/Login.jsx";
import AdminPanel from "./views/AdminPanel.jsx";
import "./App.css";
import Navbar from "./components/Navbar.jsx";

export const CurrentUserContext = createContext(null);

function App() {
  const [message, setMessage] = useState("");

  const isAuth = localStorage.getItem("token");

  const [currentUser, setCurrentUser] = useState(isAuth);

  return (
    <>
      <CurrentUserContext.Provider
        value={{
          currentUser,
          setCurrentUser,
        }}
      >
        
        <BrowserRouter>
        <Navbar isAuth={isAuth} />
          <Routes>
            {/* Ruta base en la que se encuentra el Login */} 
            <Route
              path="/"
              element={isAuth ? <Navigate to="/home" /> : <Login />}
            />
            {/* Ruta home en la que se encuentra la vista para la gestión de usuarios. Se necesita el token otorgado al inicio de sesión para acceder, de lo contrario se redirige al login*/} 
            <Route
              path="/home"
              element={isAuth ? <AdminPanel /> : <Navigate to="/" />}
            />
          </Routes>

        </BrowserRouter>
        
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
