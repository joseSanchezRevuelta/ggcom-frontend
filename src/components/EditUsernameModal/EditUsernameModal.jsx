import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { updateUsername } from "../../features/users/usersRepository";
import { updateUsernameState } from "../../features/users/usersSlice";
import { useNavigate } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";

// eslint-disable-next-line react/prop-types
function EditUsernameModal({ openEditUsernameModal, setOpenEditUsernameModal, userNameState, user_id, email, setUserNameState }) {
    const frontUrl = import.meta.env.VITE_URL_FRONT;

    const userState = useSelector(state => state.user)

    const [userName, setUserName] = useState(userNameState)
    const [newUserName, setNewUserName] = useState(userNameState)
    const [error, setError] = useState('')

    const dispatch = useDispatch();

    const navigateTo = useNavigate();

    const [loadingEditUsername, setLoadingEditUsername] = useState(false);

    const usernameRef = useRef(null);

    function handleUpdateUsername(token, user_id, user_name) {
        let error = 0;
        if (userState.userData.role == 'admin') {
            if (user_name == userName) {
                error++
                setError('New username cannot be the same')
            }
        } else {
            if (user_name == userState.userData.username) {
                error++
                setError('New username cannot be the same')
            }
        }
        if (user_name == '') {
            error++
            setError('New username required')
        } else if (user_name.length > 20) {
            error++
            setError('Username is too long (max 20')
        } else if (user_name.length < 3) {
            error++
            setError('Username is too sort (min 3)')
        }
        if (error == 0) {
            fetchData(token, user_id, user_name)
        }
    }

    async function fetchData(token, user_id, user_name) {
        setLoadingEditUsername(true)
        try {
            const response = await updateUsername(token, user_id, user_name)
            if (response) {
                if (response.errors && response.errors['data.attributes.username']) {
                    setLoadingEditUsername(false)
                    setError('Username already used')
                }
                if (response.success === true) {
                    // updateUsername(token, user_id, user_name)
                    setOpenEditUsernameModal(false)
                    setLoadingEditUsername(false)
                    setUserNameState(user_name)
                    setUserName(user_name)
                    setError('')
                    if (userState.userData.role != "admin") {
                        dispatch(updateUsernameState(user_name))
                        // window.location.href = `${frontUrl}/profile`;
                    } else if (userState.userData.role === "admin") {
                        // navigateTo(`/edituser/${user_id}/${userName}/${email}`)
                    }
                }
            } else {
                console.log("Ha ocurrido un error")
            }
        } catch (error) {
            console.error('Hubo un error en la solicitud:', error);
        }
    }

    const handleCloseEditUsername = () => {
        setOpenEditUsernameModal(false);
        if (userState.userData.role == 'admin') {
            setNewUserName(userName)
        } else {
            setNewUserName(userState.userData.username)
        }
        setError("");
    }

    return (
        <Transition.Root show={openEditUsernameModal} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={() => handleCloseEditUsername()}>
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

                <div className="fixed inset-0 w-screen overflow-y-auto z-50 ">
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
                                <div className="p-4 flex items-center justify-center relative">
                                    <span className="text-white font-bold text-center">Edit username</span>
                                    <a onClick={handleCloseEditUsername} className="absolute top-0 right-0 mt-2 mr-2 focus:outline-none rounded cursor-pointer">
                                        <XMarkIcon className="h-6 w-6 text-neutral-950 hover:text-main" />
                                    </a>
                                </div>
                                <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
                                <div className="relative z-0 w-5/6 my-6 group mx-auto">
                                    <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
                                        New username:
                                    </label>
                                    <input className="shadow border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-neutral-900 focus:border-main" id="title" type="text" placeholder="New username" value={newUserName} onChange={(e) => setNewUserName(e.target.value)} ref={usernameRef} />
                                    <small className="text-red-400">{error}</small>
                                </div>
                                <div className="text-center mt-8 pb-11">
                                    <button className="bg-main hover:bg-transparent border border-transparent hover:border-main text-white font-bold py-2 px-4 rounded mx-2 w-3/12 lg:w-2/12" onClick={() => handleUpdateUsername(userState.userData.token, user_id, newUserName)}>
                                        {loadingEditUsername ? (
                                            <div className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status"></div>
                                        ) : (
                                            'Accept'
                                        )}
                                    </button>
                                    <button className="bg-transparent hover:bg-main border border-main hover:border-main text-white font-bold py-2 px-4 rounded mx-2 w-3/12 lg:w-2/12" onClick={() => handleCloseEditUsername()}>
                                        Cancel
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root >
    )
}

export default EditUsernameModal