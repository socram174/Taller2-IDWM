import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function RegisterForm({ open, setOpen}) {

    const [loading, setLoading] = useState(false);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-10 gap-2">
        <input
          className="rounded-md focus:border-green-500 focus:ring-green-500 focus:ring-inset focus:ring"
          type="text"
          placeholder="Nombres"
          {...register("Nombres", { required: true })}
        />
        <input
          className="rounded-md focus:border-green-500 focus:ring-green-500 focus:ring-inset focus:ring"
          type="text"
          placeholder="Apellidos"
          {...register("Apellidos", { required: true })}
        />
        <select {...register("RUT o DNI", { required: true })}>
          <option value="rut">RUT</option>
          <option value="dni">DNI</option>
        </select>
        <input
          className="rounded-md focus:border-green-500 focus:ring-green-500 focus:ring-inset focus:ring"
          type="text"
          placeholder="Email"
          {...register("Email", { required: true, pattern: /^\S+@\S+$/i })}
        />
        <input
          className="rounded-md focus:border-green-500 focus:ring-green-500 focus:ring-inset focus:ring"
          type="number"
          placeholder="Puntos"
          {...register("Puntos", { required: true, max: 50000, min: 0 })}
        />

        <button
          className="border-2 p-2 rounded-md bg-green-400 mt-2 text-white font-bold hover:ring-2 hover:ring-green-500  text-center"
          type="submit"
        >
          {loading ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 animate-spin"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          ) : (
            "Crear"
          )}
        </button>

        <button onClick={()=>{
            setOpen(false);
        }} className="p-2 border rounded-md">volver</button>
      </form>
    </div>
  );
}
