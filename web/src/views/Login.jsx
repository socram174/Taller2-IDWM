import React, { useRef, useState, useContext } from "react";
import { set, useForm } from "react-hook-form";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../App";

// Vista para el inicio de sesión
const Login = () => {

    const navigate = useNavigate();
    
    const { setCurrentUser } = useContext(CurrentUserContext);

    // Se utiliza el hook useForm para el manejo de los datos del formulario
    const { register, handleSubmit, formState: { errors },} = useForm();

  // Mensaje de error en caso de que el usuario o la contraseña sean incorrectos 
  const [errorMessage, setErrorMessage] = useState(null);
  // Variable para mostrar el spinner de carga
  const [loading, setLoading] = useState(false);

  // Función que se ejecuta al enviar el formulario
  const onSubmit = async (data) => {
    setErrorMessage(null);
    setLoading(true);
    const { Username, Password } = data;

    try {
      // Se realiza la petición POST al servidor para el inicio de sesión
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: Username, password: Password }),
      });

      const info = await response.json();

      // Si el inicio de sesión es exitoso se guarda el token en el local storage y se redirige a la vista de gestión de usuarios
      if (info.success) {
        localStorage.setItem("token", info.token);
        setCurrentUser(info.user);
        navigate("/home");
      } else { // Si el inicio de sesión es fallido se muestra el mensaje de error
        setErrorMessage(info.message);
        setLoading(false);
      }
    } catch (error) { // Si ocurre un error en el servidor se muestra el mensaje de error
        setErrorMessage("Error en el servidor, por favor intentelo mas tarde");
        setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col pt-24 items-center h-full">
        {/* Tarjeta de inicio de sesión */} 
      <div className="flex flex-col justify-center items-center border-2 p-2 rounded-lg shadow-green-600 shadow-lg">
        <h1 className="font-bold text-4xl text-green-500">Iniciar sesión</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center items-center p-10  rounded-lg bg-white"
        >
          <label htmlFor="Username">Usuario</label>
          <input
            className="rounded-md focus:border-green-500 focus:ring-green-500 focus:ring-inset focus:ring"
            type="text"
            placeholder="ejemplo321"
            {...register("Username", { required: true })}
          />
          {/* Se muestra un texto rojo en caso de error en el campo Username. Se sigue esta misma logica con los demas inputs */} 
          {errors["Username"] ? (
            <span className="text-red-500">El usuario es requerido</span>
          ) : (
            <br />
          )}

          <label htmlFor="Password">Contraseña</label>
          <input
            className="rounded-md focus:border-green-500 focus:ring-green-500 focus:ring-inset focus:ring-2"
            type="password"
            placeholder=""
            {...register("Password", { required: true })}
          />
          {errors["Password"] ? (
            <span className="text-red-500">La contraseña es requerida</span>
          ) : (
            <br />
          )}

          {/* Recuadro en el cual se muestran los mensajes de error enviados por la API */} 
          {errorMessage ? (
            <div className="flex flex-col justify-center items-center border-2 border-red-500 p-4 rounded-md w-64">
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <ExclamationTriangleIcon
                  className="h-6 w-6 text-red-600"
                  aria-hidden="true"
                />
              </div>
              <div className="mt-3">
                <h3 className="text-base font-semibold leading-6 text-gray-900">
                  {errorMessage}
                </h3>
              </div>
            </div>
          ) : (
            <br />
          )}

          <button
            className="border-2 p-2 rounded-md bg-green-400 mt-2 text-white font-bold hover:ring-2 hover:ring-green-500 flex"
            type="submit"
          >
            {/* Logica para mostrar un spinner al momento de enviar información a la API */} 
            {loading ? (
              
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 animate-spin">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
</svg>
            ):("Ingresar")}

          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Login;
