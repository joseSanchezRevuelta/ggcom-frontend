import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { updateEmail } from "../../features/users/usersRepository";
import { updateEmailState } from "../../features/users/usersSlice";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function EditEmailModal({ openEditEmailModal, setOpenEditEmailModal, userEmailState, user_id, username, setUserEmailState }) {
    const frontUrl = import.meta.env.VITE_URL_FRONT;

    const userState = useSelector(state => state.user)

    const [userEmail, setUserEmail] = useState(userEmailState)

    const dispatch = useDispatch();

    const navigateTo = useNavigate();

    function handleUpdateEmail(token, user_id, user_email) {
        updateEmail(token, user_id, user_email)
        setOpenEditEmailModal(false)
        setUserEmailState(userEmail)
        if (userState.userData.role != "admin") {
            dispatch(updateEmailState(user_email))
            // window.location.href = `${frontUrl}/profile`;
        } else if (userState.userData.role === "admin") {
            navigateTo(`/edituser/${user_id}/${username}/${userEmail}`)
        }
    }

    return (
        <Transition.Root show={openEditEmailModal} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={() => setOpenEditEmailModal(false)}>
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
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-[linear-gradient(to_top,rgba(0,0,0),transparent),url('/img/signin.jpeg')] bg-cover bg-no-repeat bg-center bg-neutral-900 text-left shadow-xl transition-all sm:my-8 w-full sm:w-full max-md:max-w-lg max-lg:max-w-lg lg:max-w-lg xl:max-w-lg 2xl:max-w-lg text-center">
                                <p className="text-white">Edit Email</p>
                                <input className="shadow border rounded w-5/6 py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-neutral-900 focus:border-main my-2 mx-auto" id="title" type="text" placeholder="Title Community" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                                {/* <small className="text-red-400">{errors.titleErrorText}</small> */}
                                <div className="text-center py-8">
                                    <button className="bg-red-500 hover:bg-transparent border border-transparent hover:border-main text-white font-bold py-2 px-4 rounded mx-2" onClick={() => setOpenEditEmailModal(false)}>
                                        Cancel
                                    </button>
                                    <button className="bg-main hover:bg-transparent border border-transparent hover:border-main text-white font-bold py-2 px-4 rounded mx-2" onClick={() => handleUpdateEmail(userState.userData.token, user_id, userEmail)}>
                                        Edit
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