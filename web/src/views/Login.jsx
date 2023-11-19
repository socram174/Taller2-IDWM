import React from "react";
import { useForm } from "react-hook-form";

const Login = () => {
  const {register, handleSubmit, formState: { errors },
  } = useForm();
  
  const onSubmit = (data) => {
    console.log(data)
  };
  console.log(errors);

  return (
<div className="flex flex-col justify-center items-center h-full">
<div className="flex flex-col justify-center items-center border-2 p-2 rounded-lg shadow-green-600 shadow-lg">
        <h1 className="font-bold text-4xl text-green-500">Iniciar sesión</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center p-10  rounded-lg bg-white">
      
      <label htmlFor="Username">Usuario</label>
        <input
        className="rounded-md focus:border-green-500 focus:ring-green-500 focus:ring-inset focus:ring"
          type="text"
          placeholder="ejemplo321"
          {...register("Username", { required: true })}
        />
        {errors["Username"] ? (<span className="text-red-500">El usuario es requerido</span>):(<br/>)}

        <label htmlFor="Username">Contraseña</label>
        <input
          className="rounded-md focus:border-green-500 focus:ring-green-500 focus:ring-inset focus:ring-2"
          type="text"
          placeholder=""
          {...register("Password", { required: true })}
        />
        {errors["Password"] ? (<span className="text-red-500">La contraseña es requerida</span>):(<br/>)}

        <button className="border-2 p-2 rounded-md bg-green-400 mt-2 text-white hover:ring-2 hover:ring-green-500" type="submit">Ingresar</button>
      </form>
    </div>
</div>
  );
};

export default Login;