import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../features/users/usersRepository";
import { clearUserData } from "../../features/users/usersSlice";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function DeleteUser({ openDeleteUser, setOpenDeleteUser, user_id }) {
    const frontUrl = import.meta.env.VITE_URL_FRONT;

    const userState = useSelector(state => state.user)

    const [password, setPassword] = useState('')
    const [errorPassword, setErrorPassword] = useState('')

    const dispatch = useDispatch();

    const navigateTo = useNavigate();

    const [loadingDeleteUser, setLoadingDeleteUser] = useState(false);

    async function fetchData(token, user_id, password) {
        setErrorPassword('')
        setLoadingDeleteUser(true)
        try {
            const response = await deleteUser(token, user_id, password)
            if (response) {
                setLoadingDeleteUser(false)
                if (response.error == 'Incorrect password') {
                    setErrorPassword('Incorrect password')
                } else if (response.success == true) {
                    if (userState.userData.role != "admin") {
                        localStorage.removeItem("data_ggcom");
                        dispatch(clearUserData());
                        navigateTo(`/`)
                    } else if (userState.userData.role === "admin") {
                        navigateTo(`/userlist`)
                    }
                } else {
                    setErrorPassword('Incorrect password')
                }
            } else {
                console.log("Ha ocurrido un error")
            }
        } catch (error) {
            console.error('Hubo un error en la solicitud:', error);
        }
    }

    function handleDelete(token, user_id, password) {
        if (userState.userData.role == 'admin') {
            password = 'not password'
        }
        let errorPassword = 0
        if (password == '') {
            errorPassword++
            setErrorPassword('Password is required')
        }
        if (errorPassword == 0) {
            fetchData(token, user_id, password)
        }
    }

    function handleCloseDelete() {
        setErrorPassword('')
        setOpenDeleteUser(false)
    }

    return (
        <Transition.Root show={openDeleteUser} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={() => handleCloseDelete()}>
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
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-[linear-gradient(to_top,rgba(0,0,0),transparent),url('/img/background_modal.jpg')] bg-cover bg-no-repeat bg-center bg-neutral-900 text-left shadow-xl transition-all sm:my-8 w-full sm:w-full max-md:max-w-lg max-lg:max-w-lg lg:max-w-lg xl:max-w-lg 2xl:max-w-lg">
                                <div className="p-4 flex items-center justify-center">
                                    <span className="text-red-600 font-bold">Delete user</span>
                                </div>
                                <hr className="h-px bg-gray-200 border-0 bg-gray-700"></hr>
                                {userState.userData.role === 'user' && (
                                    <>
                                        <div className="pt-5 flex items-center justify-center">
                                            <span className="text-white">You will lose all your communities</span>
                                        </div>
                                        <div className="p-2 flex items-center justify-center">
                                            <span className="text-white">This option is irreversible</span>
                                        </div>
                                        <div className="relative z-0 w-5/6 mb-6 group mx-auto">
                                            <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
                                                Password:
                                            </label>
                                            <input className="shadow border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-neutral-900 focus:border-main" id="title" type="password" placeholder="Insert your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                            <small className="text-red-400">{errorPassword}</small>
                                        </div>
                                    </>
                                )}
                                {/* <input className="shadow border rounded w-5/6 py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-neutral-900 focus:border-main my-6 mx-auto" id="title" type="text" placeholder="Insert your password" value={password} onChange={(e) => setPassword(e.target.value)} /> */}
                                {/* <small className="text-red-400">{errorPassword}</small> */}
                                <div className="text-center mt-4 pb-11">
                                    <button className="bg-red-600 hover:bg-red-700 border border-transparent hover:border-main text-white font-bold py-2 px-4 rounded mx-2 w-3/12 lg:w-2/12" onClick={() => handleDelete(userState.userData.token, user_id, password)}>
                                        {loadingDeleteUser ? (
                                            <div className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status"></div>
                                        ) : (
                                            'Delete'
                                        )}
                                    </button>
                                    <button className="bg-transparent hover:bg-main border border-main hover:border-main text-white font-bold py-2 px-4 rounded mx-2 w-3/12 lg:w-2/12" onClick={() => handleCloseDelete()}>
                                        Cancel
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