import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function RegisterForm({ open, setOpen }) {
  const [loading, setLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState("rut");


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    setLoading(true);
    console.log(data);
    const { Nombres, Apellidos, RUT, DNI, Email, Puntos } = data;

    const user = {
        name: Nombres,
        lastName: Apellidos,
        email: Email,
        points: Puntos
    }
    if(selectedValue === "rut"){
        user.rutOrDni = RUT;
    }else {
        user.rutOrDni = DNI;
    }


    const res = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })

    const info = await res.json();

    if (info.success) {
      console.log("Usuario creado correctamente");

      setOpen(false);
      setLoading(false);
    } else {
      console.log(info.message);
        setLoading(false);
    }

  };
  console.log(errors);

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col p-10 gap-2"
      >
        <input
          className="rounded-md focus:border-green-500 focus:ring-green-500 focus:ring-inset focus:ring"
          type="text"
          placeholder="Nombres"
          {...register("Nombres", { required: true })}
        />

        {errors["Nombres"] ? (
          <span className="text-red-500">El nombres es requerido</span>
        ) : (
          <br />
        )}

        <input
          className="rounded-md focus:border-green-500 focus:ring-green-500 focus:ring-inset focus:ring"
          type="text"
          placeholder="Apellidos"
          {...register("Apellidos", { required: true })}
        />
                {errors["Apellidos"] ? (
          <span className="text-red-500">El apellido es requerido</span>
        ) : (
          <br />
        )}
        <select
          id="rutOrDni"
          {...register("RUT o DNI", { required: true })}
          onChange={() => {
            //Get and print the selected value in console
            var selectedValue = document.getElementById("rutOrDni").value;
            console.log(selectedValue);
            setSelectedValue(selectedValue);
          }}
        >
          <option value="rut">RUT</option>
          <option value="dni">DNI</option>
        </select>

        {selectedValue === "rut" ? (<>
          <input
            type="text"
            placeholder="RUT"
            {...register("RUT", {
              required: true,
              pattern: /^\d{7,8}-[k|K|\d]$/i,
            })}
          />
                  {errors["RUT"] ? (
          <span className="text-red-500">El rut es requerido con formato: XXXXXXXX-X</span>
        ) : (
          <br />
        )}
          </>
          
        ) : (
            <>
          <input
            className="rounded-md focus:border-green-500 focus:ring-green-500 focus:ring-inset focus:ring"
            type="text"
            placeholder="DNI"
            {...register("DNI", { required: true })}
          />
                  {errors["DNI"] ? (
          <span className="text-red-500">El DNI es requerido</span>
        ) : (
          <br />
        )}
          </>
        )}

        <input
          className="rounded-md focus:border-green-500 focus:ring-green-500 focus:ring-inset focus:ring"
          type="text"
          placeholder="Email: m.silva@alumnos.ucn.cl"
          {...register("Email", { required: true, pattern: /^(?!\.)[a-zA-Z0-9._%+-]+@(?!-)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?<!-)$/ })}
        />
                {errors["Email"] ? (
          <span className="text-red-500">El email es requerido y debe tener formato valido</span>
        ) : (
          <br />
        )}
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

        <button
          onClick={() => {
            setOpen(false);
          }}
          className="p-2 border rounded-md"
        >
          volver
        </button>
      </form>
    </div>
  );
}
