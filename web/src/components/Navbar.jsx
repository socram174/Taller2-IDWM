import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../App";


const Navbar = ({ isAuth }) => {

    const { setCurrentUser } = useContext(CurrentUserContext);

    const navigate = useNavigate();

    // Función para cerrar sesión
    const logout = () => {
        localStorage.removeItem("token");
        setCurrentUser(null);
        navigate("/");
    };

    // Si el usuario está autenticado, se muestra el botón de cerrar sesión
  if (isAuth) {
    return (
      <nav className="text-center bg-green-500 p-2  fixed w-full flex justify-between items-center z-10">
        <h1 className="font-bold text-white text-4xl">DUMBO</h1>
        <button onClick={logout} className="border-2 p-2 rounded-md bg-red-400 text-white font-bold hover:ring-2 hover:ring-green-500  sm:block">
            Cerrar sesión
        </button>
      </nav>
    );
  }

  // Si el usuario no está autenticado, no se muestra el botón de iniciar sesión y la palabra "DUMBO" se muestra centrada
  return (
    <nav className="text-center bg-green-500 p-2  fixed w-full z-10">
      <h1 className="font-bold text-white text-4xl">DUMBO</h1>
    </nav>
  );
};

export default Navbar;
