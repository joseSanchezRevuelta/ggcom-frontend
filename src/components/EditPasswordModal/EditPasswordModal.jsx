import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useState } from "react"
import { useSelector } from "react-redux";
import { updatePassword } from "../../features/users/usersRepository";
import { XMarkIcon } from "@heroicons/react/24/outline";

// eslint-disable-next-line react/prop-types
function EditPasswordlModal({ openEditPasswordModal, setOpenEditPasswordModal, user_id }) {
    const userState = useSelector(state => state.user)

    //password
    const [userPassword, setUserPassword] = useState('')
    const [userNewPassword, setUserNewPassword] = useState('')
    const [userPasswordConfirm, setUserPasswordConfirm] = useState('')
    //error
    const [errorUserPassword, setErrorUserPassword] = useState("")
    const [errorNewPassword, setErrorNewPassword] = useState("")
    const [errorPasswordConfirm, setErrorPasswordConfirm] = useState("")

    const [success, setSuccess] = useState("")

    const [loadingEditPassword, setLoadingEditPassword] = useState(false);

    function handleUpdatePassword(token, user_id, userPassword, userNewPassword, userPasswordConfirm) {
        setSuccess('')
        setErrorUserPassword('')
        setErrorNewPassword('')
        setErrorPasswordConfirm('')
        let errorUserPassword = 0
        let errorNewPassword = 0
        let errorPasswordConfirm = 0
        let expRegPass = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,30}$/
        if (userState.userData.role === 'user' && userPassword === "") {
            errorUserPassword++;
            setErrorUserPassword('Current password is required')
        } else if (userPassword == userNewPassword) {
            setErrorNewPassword('')
            setErrorNewPassword('Password cannot be the current one')
            errorPasswordConfirm++
        } else {
            setErrorUserPassword('')
            errorUserPassword = 0
        }
        if (userNewPassword == '') {
            errorNewPassword++;
            setErrorNewPassword('New password is required')
        } else if (userNewPassword.length < 5) {
            errorNewPassword++
            setErrorNewPassword('Password is too sort (min 5)')
        } else if (userNewPassword.length > 20) {
            errorNewPassword++
            setErrorNewPassword('Password is too long (max 20)')
        } else if (expRegPass.test(userNewPassword) === false) {
            errorNewPassword++
            setErrorNewPassword('Password must match')
        } else if (userNewPassword != userPasswordConfirm) {
            setErrorNewPassword('')
            setErrorPasswordConfirm('Password must match')
            errorPasswordConfirm++
        } else {
            setErrorPasswordConfirm('')
            errorNewPassword = 0
            errorNewPassword = 0
            errorPasswordConfirm = 0
        }
        if (errorUserPassword === 0 && errorNewPassword === 0 && errorPasswordConfirm == 0) {
            fetchData(token, user_id, userPassword, userNewPassword, userPasswordConfirm)
        }
    }

    async function fetchData(token, user_id, userPassword, userNewPassword, userPasswordConfirm) {
        setLoadingEditPassword(true)
        const response = await updatePassword(token, user_id, userPassword, userNewPassword, userPasswordConfirm)
        if (response.success == false) {
            setLoadingEditPassword(false)
            setErrorUserPassword('Incorrect current password')
        } else {
            setLoadingEditPassword(false)
            setErrorUserPassword('')
            setErrorNewPassword('')
            setErrorPasswordConfirm('')
            setUserPassword('')
            setUserNewPassword('')
            setUserPasswordConfirm('')
            setSuccess("Password update correctly")
        }
    }

    const handleCloseEditPassword = () => {
        setOpenEditPasswordModal(false);
        setErrorUserPassword('')
        setErrorNewPassword('')
        setErrorPasswordConfirm('')
        setUserPassword('')
        setUserNewPassword('')
        setUserPasswordConfirm('')
        setSuccess('')
    }

    return (
        <Transition.Root show={openEditPasswordModal} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={() => handleCloseEditPassword()}>
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
                                <div className="p-4 flex items-center justify-center relative">
                                    <span className="text-white font-bold text-center">Edit password</span>
                                    <a onClick={handleCloseEditPassword} className="absolute top-0 right-0 mt-2 mr-2 focus:outline-none rounded cursor-pointer">
                                        <XMarkIcon className="h-6 w-6 text-neutral-950 hover:text-main" />
                                    </a>
                                </div>
                                <hr className="h-px bg-gray-200 border-0 bg-gray-700"></hr>
                                <p id="error_signin" className="error_signin text-green-500 text-sm text-center font-semibold my-6">{success}</p>
                                {userState.userData.role === 'user' && (
                                    <div className="relative z-0 w-5/6 my-6 group mx-auto">
                                        <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
                                            Current pass:
                                        </label>
                                        <input className="shadow border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-neutral-900 focus:border-main" id="title" type="password" placeholder="Current password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} />
                                        <small className="text-red-400">{errorUserPassword}</small>
                                    </div>
                                )}
                                <div className="relative z-0 w-5/6 my-6 group mx-auto">
                                    <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
                                        New password:
                                    </label>
                                    <input className="shadow border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-neutral-900 focus:border-main" id="title" type="password" placeholder="New password" value={userNewPassword} onChange={(e) => setUserNewPassword(e.target.value)} />
                                    <small className="text-red-400">{errorNewPassword}</small>
                                </div>
                                <div className="relative z-0 w-5/6 my-6 group mx-auto">
                                    <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
                                        Confirm new pass:
                                    </label>
                                    <input className="shadow border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-neutral-900 focus:border-main" id="title" type="password" placeholder="Confirm password" value={userPasswordConfirm} onChange={(e) => setUserPasswordConfirm(e.target.value)} />
                                    <small className="text-red-400">{errorPasswordConfirm}</small>
                                </div>
                                <div className="text-center mt-8 pb-11">
                                    <button className="bg-main hover:bg-transparent border border-transparent hover:border-main text-white font-bold py-2 px-4 rounded mx-2 w-3/12 lg:w-2/12" onClick={() => handleUpdatePassword(userState.userData.token, user_id, userPassword, userNewPassword, userPasswordConfirm)}>
                                        {loadingEditPassword ? (
                                            <div className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status"></div>
                                        ) : (
                                            'Accept'
                                        )}
                                    </button>
                                    <button className="bg-transparent hover:bg-main border border-main hover:border-main text-white font-bold py-2 px-4 rounded mx-2 w-3/12 lg:w-2/12" onClick={() => handleCloseEditPassword()}>
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

export default EditPasswordlModal