import React, { useState } from "react";
import RegisterModal from "../components/RegisterModal";

const AdminPanel = () => {
    const [open, setOpen] = useState(false);
  return (
    <>
      <div className="pt-24">

        <div class="relative shadow-md rounded-lg flex md:justify-center flex-col md:items-center">
        <div className="flex justify-between w-full md:w-[80%] max-w-[auto] p-4 flex-col md:flex-row gap-4">
          <button onClick={()=>{setOpen(true)}}  className="border-2 border-blue-700 bg-blue-500 p-2 rounded-md text-white max-w-max">
            Nuevo usuario
          </button>
          <input type="text" placeholder="Buscar usuario..." className="max-w-[240px]" />
        </div>
<div className="overflow-x-auto w-full flex md:justify-center p-4">
<table class="text-sm text-left rtl:text-right w-full md:w-[80%] max-w-[auto]">
            <thead class="text-xs uppercase bg-green-200">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Nombre
                </th>
                <th scope="col" class="px-6 py-3">
                  Apellido
                </th>
                <th scope="col" class="px-6 py-3">
                  RUT o DNI
                </th>
                <th scope="col" class="px-6 py-3">
                  Email
                </th>
                <th scope="col" class="px-6 py-3">
                  Puntos
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="">
                <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap">
                  Apple MacBook Pro 17"
                </th>
                <td class="px-6 py-4">Silver</td>
                <td class="px-6 py-4">Laptop</td>
                <td class="px-6 py-4">$2999</td>
                <td class="px-6 py-4">
                  <a
                    href="#"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
              <tr class="">
                <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap">
                  Apple MacBook Pro 17"
                </th>
                <td class="px-6 py-4">Silver</td>
                <td class="px-6 py-4">Laptop</td>
                <td class="px-6 py-4">$2999</td>
                <td class="px-6 py-4">
                  <a
                    href="#"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
              <tr class="">
                <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap">
                  Apple MacBook Pro 17"
                </th>
                <td class="px-6 py-4">Silver</td>
                <td class="px-6 py-4">Laptop</td>
                <td class="px-6 py-4">$2999</td>
                <td class="px-6 py-4">
                  <a
                    href="#"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
              <tr class="hover:bg-green-100 border-2 rounded-lg">
                <th scope="row" class="px-6 py-4 font-medium ">
                  Apple MacBook Pro 17"
                </th>
                <td class="px-6 py-4">Silver</td>
                <td class="px-6 py-4">Laptop</td>
                <td class="px-6 py-4">$2999</td>
                <td class="px-6 py-4">
                  <a
                    href="#"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
</div>
        </div>
      </div>
        <RegisterModal open={open} setOpen={setOpen} />
    </>
  );
};

export default AdminPanel;
