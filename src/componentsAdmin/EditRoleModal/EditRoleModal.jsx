import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { updateRole } from "../../features/users/usersRepository";
import { updateRoleState } from "../../features/users/usersSlice";
import { XMarkIcon } from "@heroicons/react/24/outline";

// eslint-disable-next-line react/prop-types
function EditRoleModal({ openEditRoleModal, setOpenEditRoleModal, user_id, roleState, setRoleState }) {

    const userState = useSelector(state => state.user)

    const [userRole, setUserRole] = useState(roleState)
    const [newUserRole, setNewUserRole] = useState(roleState)
    const [error, setError] = useState('')

    const dispatch = useDispatch();

    async function fetchData(token, user_id, user_role) {
        try {
            const response = await updateRole(token, user_id, user_role)
            if (response) {
                if (response.errors && response.errors['data.attributes.username']) {
                    setError('Username already used')
                }
                if (response.success === true) {
                    // updateUsername(token, user_id, user_role)
                    setOpenEditRoleModal(false)
                    setRoleState(user_role)
                    setUserRole(user_role)
                    setError('')
                }
            } else {
                console.log("Ha ocurrido un error")
            }
        } catch (error) {
            console.error('Hubo un error en la solicitud:', error);
        }
    }

    function handleUpdateRole(token, user_id, user_role) {
        let error = 0;
        if (userState.userData.role == 'admin') {
            if (user_role == userRole) {
                error++
                setError('New username cannot be the same')
            }
        } else {
            if (user_role == userState.userData.role) {
                error++
                setError('New username cannot be the same')
            }
        }
        if (user_role == '') {
            error++
            setError('New username required')
        } else if (user_role.length > 20) {
            error++
            setError('Username is too long (max 20')
        } else if (user_role.length < 3) {
            error++
            setError('Username is too sort (min 3)')
        }
        if (error == 0) {
            fetchData(token, user_id, user_role)
        }
    }

    const handleCloseEditRole = () => {
        setOpenEditRoleModal(false);
        if (userState.userData.role == 'admin') {
            setNewUserRole(userRole)
        } else {
            setUserRole(userState.userData.username)
        }
        setError("");
    }

    // useEffect(() => {
    //     const timeoutId = setTimeout(() => {
    //       if (usernameRef.current) {
    //         usernameRef.current.focus();
    //       }
    //     }, 300);

    //     return () => clearTimeout(timeoutId);
    //   }, [openEditUsernameModal]);

    return (
        <Transition.Root show={openEditRoleModal} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={() => handleCloseEditRole()}>
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
                                    <a onClick={handleCloseEditRole} className="absolute top-0 right-0 mt-2 mr-2 focus:outline-none rounded cursor-pointer">
                                        <XMarkIcon className="h-6 w-6 text-neutral-950 hover:text-main" />
                                    </a>
                                </div>
                                <hr className="h-px bg-gray-200 border-0 bg-gray-700"></hr>
                                <div className="relative z-0 w-5/6 my-6 group mx-auto">
                                    <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
                                        New username:
                                    </label>
                                    <select
                                        id="Country"
                                        name="country"
                                        autoComplete="country-name"
                                        placeholder="Country"
                                        className="w-full rounded-md py-2 px-1 bg-neutral-900 text-white shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-main lg:max-w-xs w-full text-md sm:leading-6 rounded-md cursor-pointer"
                                        value={newUserRole}
                                        onChange={(e) => setNewUserRole(e.target.value)}
                                    >
                                        <option key="countryDefault" value={newUserRole}>
                                            {newUserRole}
                                        </option>
                                        {
                                            newUserRole == 'user' ? (
                                                <option key="admin" value='admin' className='cursor-pointer'>
                                                    admin
                                                </option>
                                            ) : (
                                                <option key="user" value='user' className='cursor-pointer'>
                                                    user
                                                </option>
                                            )
                                        }
                                    </select>
                                    <small className="text-red-400">{error}</small>
                                </div>
                                <div className="text-center mt-8 pb-11">
                                    <button className="bg-main hover:bg-transparent border border-transparent hover:border-main text-white font-bold py-2 px-4 rounded mx-2" onClick={() => handleUpdateRole(userState.userData.token, user_id, newUserRole)}>
                                        Accept
                                    </button>
                                    <button className="bg-transparent hover:bg-main border border-main hover:border-main text-white font-bold py-2 px-4 rounded mx-2" onClick={() => handleCloseEditRole()}>
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

export default EditRoleModal