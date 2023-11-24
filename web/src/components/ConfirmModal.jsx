import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const ConfirmModal = ({open, setOpen, id, getUsers}) => {
  const [loading, setLoading] = useState(false);

  const cancelButtonRef = useRef(null);
  

  // Función para eliminar un usuario. Es necesario enviar el token de autenticación en el header de la petición
  const deleteUser = async (id) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:3000/api/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });
    const data = await res.json();
    console.log(data);
    setLoading(false);
    getUsers();
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      {/* Toda esta logica pertenece al modal de headless ui de tailwind */} 
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={()=>{ // Esta función se ejecuta al hacer click fuera del modal, por lo que la desactive
            console.log("outside close modal clicked");
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-full overflow-y-auto flex flex-col justify-center items-center">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0 w-[80%]">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="md:flex md:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        ¿Realmente desea eliminar este usuario?
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Una vez eliminado el usuario no podrá recuperarlo.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 p-4">
                <button onClick={()=>{ // Esta función se ejecuta al hacer click en el boton de eliminar, y llama a la función deleteUser
                    setLoading(true);
                    deleteUser(id);
                    getUsers();
                    setOpen(false);
                }}
          className="border-2 p-2 rounded-md bg-red-400 mt-2 text-white font-bold hover:ring-2 hover:ring-red-500  text-center"
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
            "Eliminar"
          )}
        </button>

        <button
          onClick={() => {
            setOpen(false);
          }}
          className="border-2 p-2 rounded-md  mt-2  hover:ring-2 hover:ring-green-500  text-center"
        >
          Cancelar
        </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ConfirmModal;