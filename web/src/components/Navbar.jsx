import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../App";


const Navbar = ({ isAuth }) => {

    const { setCurrentUser } = useContext(CurrentUserContext);

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        setCurrentUser(null);
        navigate("/");
    };

  if (isAuth) {
    return (
      <nav className="text-center bg-green-500 p-2  fixed w-full flex justify-between items-center z-10">
        <h1 className="font-bold text-white text-4xl">DUMBO</h1>
        <button onClick={logout} className="border-2 p-2 rounded-md bg-red-400 text-white font-bold hover:ring-2 hover:ring-green-500 hidden sm:block">
            Cerrar sesión
        </button>
      </nav>
    );
  }

  return (
    <nav className="text-center bg-green-500 p-2  fixed w-full z-10">
      <h1 className="font-bold text-white text-4xl">DUMBO</h1>
    </nav>
  );
};

export default Navbar;
