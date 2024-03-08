import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { updateEmail } from "../../features/users/usersRepository";
import { updateEmailState } from "../../features/users/usersSlice";
import { useNavigate } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";

// eslint-disable-next-line react/prop-types
function EditEmailModal({ openEditEmailModal, setOpenEditEmailModal, userEmailState, user_id, username, setUserEmailState }) {
    const frontUrl = import.meta.env.VITE_URL_FRONT;

    const userState = useSelector(state => state.user)

    const [newEmail, setNewEmail] = useState('')
    const [newEmailConfirm, setNewEmailConfirm] = useState('')
    const [errorEmail, setErrorEmail] = useState('')
    const [errorEmailConfirm, setErrorEmailConfirm] = useState('')

    const dispatch = useDispatch();

    const navigateTo = useNavigate();

    function handleUpdateEmail(token, user_id, newEmail, newEmailConfirm) {
        console.log(newEmailConfirm)
        let errorEmail = 0
        let errorEmaiConfirm = 0
        let expRegEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (newEmail == '') {
            errorEmail++
            setErrorEmail('New email required')
        } else if (expRegEmail.test(newEmail) === false) {
            errorEmail++
            setErrorEmail('Email must be valid')
            setErrorEmailConfirm('')
        } else if (newEmail != newEmailConfirm) {
            errorEmaiConfirm++
            setErrorEmail('')
            setErrorEmailConfirm('Email must match')
        } else if (newEmail == userEmailState) {
            errorEmaiConfirm++
            setErrorEmailConfirm('')
            setErrorEmail('New email cannot be the same')
        } else {
            setErrorEmail('')
            setErrorEmailConfirm('')
            errorEmail = 0
            errorEmaiConfirm = 0
        }
        if (errorEmail == 0 && errorEmaiConfirm == 0) {
            fetchData(token, user_id, newEmail, newEmailConfirm)
        }
    }

    async function fetchData(token, user_id, newEmail, newEmailConfirm) {
        try {
            const response = await updateEmail(token, user_id, newEmail, newEmailConfirm)
            if (response) {
                console.log(response)
                if (response.errors && response.errors['data.attributes.email']) {
                    setErrorEmailConfirm('')
                    setErrorEmail('Email already used')
                }
                if (response.success === true) {
                    // updateUsername(token, user_id, user_name)
                    setOpenEditEmailModal(false)
                    setUserEmailState(newEmail)
                    setNewEmail('')
                    setNewEmailConfirm('')
                    if (userState.userData.role != "admin") {
                        dispatch(updateEmailState(newEmail))
                        // window.location.href = `${frontUrl}/profile`;
                    } else if (userState.userData.role === "admin") {
                        navigateTo(`/edituser/${user_id}/${username}/${newEmail}`)
                    }
                }
            } else {
                console.log("Ha ocurrido un error")
            }
        } catch (error) {
            console.error('Hubo un error en la solicitud:', error);
        }
    }

    const handleCloseEditEmail = () => {
        setNewEmail('')
        setNewEmailConfirm('')
        setErrorEmailConfirm('')
        setErrorEmail('')
        setOpenEditEmailModal(false);
    }

    return (
        <Transition.Root show={openEditEmailModal} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={() => handleCloseEditEmail()}>
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
                                <div className="p-4 flex items-center justify-center relative">
                                    <span className="text-white font-bold text-center">Edit email</span>
                                    <a onClick={handleCloseEditEmail} className="absolute top-0 right-0 mt-2 mr-2 focus:outline-none rounded cursor-pointer">
                                        <XMarkIcon className="h-6 w-6 text-neutral-950 hover:text-main" />
                                    </a>
                                </div>
                                <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
                                <div className="relative z-0 w-5/6 my-6 group mx-auto">
                                    <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
                                        New email:
                                    </label>
                                    <input className="shadow border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-neutral-900 focus:border-main" id="title" type="text" placeholder="New email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
                                    <small className="text-red-400">{errorEmail}</small>
                                </div>
                                <div className="relative z-0 w-5/6 my-6 group mx-auto">
                                    <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
                                        Confirm email:
                                    </label>
                                    <input className="shadow border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-neutral-900 focus:border-main" id="title" type="text" placeholder="Confirm email" value={newEmailConfirm} onChange={(e) => setNewEmailConfirm(e.target.value)} />
                                    <small className="text-red-400">{errorEmailConfirm}</small>
                                </div>
                                <div className="text-center mt-8 pb-11">
                                    <button className="bg-main hover:bg-transparent border border-transparent hover:border-main text-white font-bold py-2 px-4 rounded mx-2" onClick={() => handleUpdateEmail(userState.userData.token, user_id, newEmail, newEmailConfirm)}>
                                        Accept
                                    </button>
                                    <button className="bg-transparent hover:bg-main border border-main hover:border-main text-white font-bold py-2 px-4 rounded mx-2" onClick={() => handleCloseEditEmail()}>
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

export default EditEmailModal