import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useState } from "react"
import { useSelector } from "react-redux";
import { updatePassword } from "../../features/users/usersRepository";

// eslint-disable-next-line react/prop-types
function EditPasswordlModal({ openEditPasswordModal, setOpenEditPasswordModal, user_id }) {
    const userState = useSelector(state => state.user)

    const [userPasword, setUserPassword] = useState('')
    const [userPasswoordConfirm, setUserPasswordConfirm] = useState('')
    const [successPassword, setSuccessPassword] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [errorPasswordConfirm, setErrorPasswordConfirm] = useState("")

    function handleUpdatePassword(token) {
        let errorP = 0
        let errorPC = 0
        if (userPasword === "") {
            setErrorPassword('Password is required')
            errorP++;
        } else {
            setErrorPassword('')
            errorP = 0
        }
        if (userPasword !== userPasswoordConfirm) {
            setErrorPasswordConfirm('Password must')
            errorPC++
        } else {
            setErrorPasswordConfirm('')
            errorPC = 0
        }
        if (errorP === 0 && errorPC === 0) {
            updatePassword(token, user_id, userPasword, userPasswoordConfirm)
            setSuccessPassword('Password success')
            setOpenEditPasswordModal(false)
        }
    }

    return (
        <Transition.Root show={openEditPasswordModal} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={() => setOpenEditPasswordModal(false)}>
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
                                <p className="text-white">Change password</p>
                                <small className="text-green-700">{successPassword}</small>
                                <input className="shadow border rounded w-5/6 py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-neutral-900 focus:border-main my-2 mx-auto" id="title" type="text" placeholder="New password" value={userPasword} onChange={(e) => setUserPassword(e.target.value)} />
                                <small className="text-red-400">{errorPassword}</small>
                                <input className="shadow border rounded w-5/6 py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-neutral-900 focus:border-main my-2 mx-auto" id="title" type="text" placeholder="Confirm new password" value={userPasswoordConfirm} onChange={(e) => setUserPasswordConfirm(e.target.value)} />
                                <small className="text-red-400">{errorPasswordConfirm}</small>
                                <div className="text-center py-8">
                                    <button className="bg-red-500 hover:bg-transparent border border-transparent hover:border-main text-white font-bold py-2 px-4 rounded mx-2" onClick={() => setOpenEditPasswordModal(false)}>
                                        Cancel
                                    </button>
                                    <button className="bg-main hover:bg-transparent border border-transparent hover:border-main text-white font-bold py-2 px-4 rounded mx-2" onClick={() => handleUpdatePassword(userState.userData.token, user_id, userPasword)}>
                                        Change password
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

export default EditPasswordlModal