import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react"
import { useSelector } from "react-redux";
import { deleteUser } from "../../features/users/usersRepository";

// eslint-disable-next-line react/prop-types
function DeleteUser({openDeleteUser, setOpenDeleteUser }) {

    const userState = useSelector(state => state.user)

    function handleDelete(token, user_id) {
        deleteUser(token, user_id)
    }

    return (
        <Transition.Root show={openDeleteUser} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={() => setOpenDeleteUser(false)}>
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

                <div className="fixed inset-0 w-screen overflow-y-auto z-50">
                    <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-[linear-gradient(to_top,rgba(0,0,0),transparent),url('/img/signin.jpeg')] bg-cover bg-no-repeat bg-center bg-neutral-900 text-left shadow-xl transition-all sm:my-8 w-full sm:w-full max-md:max-w-lg max-lg:max-w-lg lg:max-w-lg xl:max-w-lg 2xl:max-w-lg">
                                <div className="text-center py-8">
                                    <button className="bg-red-500 hover:bg-transparent border border-transparent hover:border-main text-white font-bold py-2 px-4 rounded mx-2" onClick={() => setOpenDeleteUser(false)}>
                                        Cancel
                                    </button>
                                    <button className="bg-main hover:bg-transparent border border-transparent hover:border-main text-white font-bold py-2 px-4 rounded mx-2" onClick={() => handleDelete(userState.userData.token, userState.userData.id)}>
                                        Delete
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default DeleteUser