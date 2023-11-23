import React, { useState, useEffect } from "react";
import RegisterModal from "../components/RegisterModal";
import ConfirmModal from "../components/ConfirmModal";

const AdminPanel = () => {
  const [open, setOpen] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const res = await fetch("http://localhost:3000/api/users");
    const data = await res.json();
    console.log(data.users);
    setUsers(data.users);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div className="pt-24">
        <div className="relative shadow-md rounded-lg flex md:justify-center flex-col md:items-center">
          <div className="flex justify-between w-full md:w-[80%] max-w-[auto] p-4 flex-col md:flex-row gap-4">
            <button
              onClick={() => {
                setOpen(true);
              }}
              className="border-2 border-blue-700 bg-blue-500 p-2 rounded-md text-white max-w-max"
            >
              Nuevo usuario
            </button>
            <input
              type="text"
              placeholder="Buscar usuario..."
              className="max-w-[240px]"
            />
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
                  <th scope="col" class="px-6 py-3">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  return (
                    <tr key={user._id} class="">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium whitespace-nowrap"
                    >
                      {user.name}
                    </th>
                    <td class="px-6 py-4">{user.lastName}</td>
                    <td class="px-6 py-4">{user.rutOrDni}</td>
                    <td class="px-6 py-4">{user.email}</td>
                    <td class="px-6 py-4">
                      {user.points}
                    </td>
                    <td class="px-6 py-4 flex">
                      <button className="bg-green-500 text-white rounded-md p-2 border-2">
                        Editar
                      </button>
                      <button id={user._id} onClick={(e) => {
                        console.log(e.currentTarget.id);
                        setSelectedId(e.currentTarget.id);
                        console.log(selectedId);
                        //deleteUser(user._id);
                        setOpenConfirmModal(true);
                      }} className="bg-red-500 text-white rounded-md p-2 border-2">
                        Eliminar
                      </button>
                    </td>
                  </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <RegisterModal open={open} setOpen={setOpen} getUsers={getUsers}  />
      <ConfirmModal open={openConfirmModal} setOpen={setOpenConfirmModal} id={selectedId} getUsers={getUsers}  />
    </>
  );
};

export default AdminPanel;
