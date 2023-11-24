import React, { useState, useEffect } from "react";
import RegisterModal from "../components/RegisterModal";
import ConfirmModal from "../components/ConfirmModal";
import EditModal from "../components/EditModal";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  // Variable para mostrar el modal de registro de usuarios
  const [open, setOpen] = useState(false);
  // Variable para mostrar el modal de confirmación de eliminación de usuarios
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  // Variable para mostrar el modal de edición de usuarios
  const [openEditModal, setOpenEditModal] = useState(false);
  // Variable para guardar el id del usuario seleccionado
  const [selectedId, setSelectedId] = useState("");
  // Variable para guardar el valor del input de búsqueda
  const [searchValue, setSearchValue] = useState("");
  // Variable para guardar el usuario seleccionado al editar
  const [selectedUser, setSelectedUser] = useState({});

  // Variable para guardar la lista de usuarios obtenida desde el servidor
  const [users, setUsers] = useState([]);
  // Variable para guardar la lista de usuarios filtrados
  const [filteredUsers, setFilteredUsers] = useState([]);

  const navigate = useNavigate();

  
  // Función para obtener la lista de usuarios desde el servidor y guardarla en la variable users. Es necesario enviar el token de autenticación en el header de la petición
  const getUsers = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:3000/api/users",{
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });
    const data = await res.json();
    console.log(data.users);
    setUsers(data.users);
  };

  // Se ejecuta la función getUsers al cargar la vista
  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    // Se filtra la lista de usuarios según el valor del input de búsqueda
    const filtered = users.filter(
      (user) =>
        user.rutOrDni.includes(searchValue) || user.email.includes(searchValue)
    );
    setFilteredUsers(filtered);
  }, [searchValue, users]);

  return (
    <>
      <div className="pt-24">
        <div className="relative shadow-md rounded-lg flex md:justify-center flex-col md:items-center">
          {/* Recuadro para el boton de registro de usuarios y el input de busqueda */} 
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
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          <div className="overflow-x-auto w-full flex md:justify-center p-4">
            {/* Tabla de usuarios */} 
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
                {filteredUsers.map((user) => {
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
                      <button id={user._id} className="bg-green-500 text-white rounded-md p-2 border-2" onClick={(e) => {
                        setSelectedId(e.currentTarget.id);
                        setSelectedUser(user);
                        setOpenEditModal(true);
                        
                      }}>
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
      {/* Modal para el registro de usuarios */}
      <RegisterModal open={open} setOpen={setOpen} getUsers={getUsers}  />
      {/* Modal para confirmar la eliminacion de un usuario */} 
      <ConfirmModal open={openConfirmModal} setOpen={setOpenConfirmModal} id={selectedId} getUsers={getUsers}  />
      {/* Modal para editar un usuario */} 
      <EditModal open={openEditModal} setOpen={setOpenEditModal} getUsers={getUsers} selectedUser={selectedUser} setSelectedUser={setSelectedUser}
      />
    </>
  );
};

export default AdminPanel;
