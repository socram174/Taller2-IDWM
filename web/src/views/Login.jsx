import React, { useRef, useState, Fragment } from "react";
import { useForm } from "react-hook-form";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../App";

const Login = () => {

    const navigate = useNavigate();
    
    const {
        setCurrentUser
      } = useContext(CurrentUserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = async (data) => {
    const { Username, Password } = data;

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: Username, password: Password }),
      });

      const info = await response.json();

      if (info.success) {
        localStorage.setItem("token", info.token);
        setCurrentUser(info.user);
        navigate("/home");
      } else {
        setErrorMessage(info.message);
      }
    } catch (error) {
        setErrorMessage("Error en el servidor, por favor intentelo mas tarde");
    }
  };
  //console.log(errors);

  return (
    <div className="flex flex-col justify-center items-center h-full">
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

          {errorMessage ? (
            <div className="flex flex-col justify-center items-center border-2 border-red-500 p-4 rounded-md">
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
            className="border-2 p-2 rounded-md bg-green-400 mt-2 text-white hover:ring-2 hover:ring-green-500"
            type="submit"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
