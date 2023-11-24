import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";

export default function EditForm({ open, setOpen, getUsers, selectedUser, setSelectedUser }) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  

  const onSubmit = async (data) => {
    setLoading(true);
    console.log(data);
    const { Nombres, Apellidos, Email, Puntos } = data;

    const user = {
      name: Nombres,
      lastName: Apellidos,
      email: Email,
      points: Puntos,
    };

    const res = await fetch(`http://localhost:3000/api/users/edit/${selectedUser.rutOrDni}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const info = await res.json();

    if (info.success) {
      console.log("Usuario editado correctamente");
      getUsers();
      setOpen(false);
    } else {
      console.error(info.message);
    }

    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-10 gap-2">
        <label htmlFor="rutOrDni">RUT/DNI</label>
        <input
          type="text"
          placeholder="RUT/DNI"
          value={selectedUser.rutOrDni}
          disabled
        />

        <Controller
          name="Nombres"
          control={control}
          defaultValue={selectedUser.name}
          
          render={({ field }) => (
            <>
              <input
                {...field}
                className="rounded-md focus:border-green-500 focus:ring-green-500 focus:ring-inset focus:ring"
                type="text"
                placeholder="Nombres"
                {...register("Nombres", { required: true })}
              />
              {errors["Nombres"] && (
                <span className="text-red-500">El nombre es requerido</span>
              )}
            </>
          )}
        />

        <Controller
          name="Apellidos"
          control={control}
          defaultValue={selectedUser.lastName}
          
          render={({ field }) => (
            <>
              <input
                {...field}
                className="rounded-md focus:border-green-500 focus:ring-green-500 focus:ring-inset focus:ring"
                type="text"
                placeholder="Apellidos"
                {...register("Apellidos", { required: true })}
              />
              {errors["Apellidos"] && (
                <span className="text-red-500">El apellido es requerido</span>
              )}
            </>
          )}
        />

        <Controller
          name="Email"
          control={control}
          defaultValue={selectedUser.email}
          render={({ field }) => (
            <>
              <input
                {...field}
                className="rounded-md focus:border-green-500 focus:ring-green-500 focus:ring-inset focus:ring"
                type="text"
                placeholder="Email: m.silva@alumnos.ucn.cl"
                {...register("Email", { required: true, pattern: /^(?!\.)[a-zA-Z0-9._%+-]+@(?!-)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?<!-)$/ })}
              />
              {errors["Email"] && (
                <span className="text-red-500">
                  El email es requerido y debe tener formato valido
                </span>
              )}
            </>
          )}
        />

        <Controller
          name="Puntos"
          control={control}
          defaultValue={selectedUser.points}
          render={({ field }) => (
            <>
              <input
                {...field}
                className="rounded-md focus:border-green-500 focus:ring-green-500 focus:ring-inset focus:ring"
                type="number"
                placeholder="Puntos"
                {...register("Puntos", { required: true, max: 50000, min: 0 })}
              />
              {errors["Puntos"] && (
                <span className="text-red-500">
                  Puntos requeridos y un maximo de 50000 puntos
                </span>
              )}
            </>
          )}
        />

        <button
          className="border-2 p-2 rounded-md bg-green-400 mt-2 text-white font-bold hover:ring-2 hover:ring-green-500 text-center"
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
            "Editar"
          )}
        </button>

        <button
          onClick={() => {
            setOpen(false);
          }}
          className="p-2 border rounded-md"
        >
          Volver
        </button>
      </form>
    </div>
  );
}
