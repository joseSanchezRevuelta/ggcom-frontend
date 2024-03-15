import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux';
import { XMarkIcon } from '@heroicons/react/24/outline'

// eslint-disable-next-line react/prop-types
const ForgotPassword = ({ openForgotPassword, setOpenForgotPassword, setOpenSignIn }) => {

    const dispatch = useDispatch();
    const loginState = useSelector(state => state.user)

    const emailRef = useRef(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        setEmail('')
        // espero 0.3 seg para el renderizado
        const timeoutId = setTimeout(() => {
            if (emailRef.current) {
                emailRef.current.focus();
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [openForgotPassword]);

    const handleCloseForgotPassword = () => {
        setOpenForgotPassword(false);
        // openForgotPassword(true);
        setError("");
        setSuccess("");
    }

    const handleButtonSignIn = () => {
        setOpenForgotPassword(false);
        setOpenSignIn(true)
        setError("");
        setSuccess("");
    }

    const handleSubmit = (event) => {
        let error = 0;
        let expRegEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (email === "") {
            setSuccess("");
            setError("Email required");
            error++
            emailRef.current.focus()
            event.preventDefault();
        } else if (expRegEmail.test(email) === false) {
            error++
            setSuccess("");
            setError("Email must be valid");
        } else {
            error = 0
            setSuccess("");
            setError("");
            event.preventDefault();
        }
        if (error == 0) {
            setError("");
            setSuccess("Link sent. Please check your email.");
            event.preventDefault();
        }
    };

    return (
        <Transition.Root show={openForgotPassword} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={handleCloseForgotPassword}>
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
                                    <span className="text-white font-bold text-center">Reset password</span>
                                    <button onClick={handleCloseForgotPassword} className="absolute top-0 right-0 mt-2 mr-2 focus:outline-none rounded">
                                        <XMarkIcon className="h-6 w-6 text-neutral-950 hover:text-main" />
                                    </button>
                                </div>
                                <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
                                <form className="max-w-md mx-auto mb-10 font-bold-600">
                                    <div className="relative z-0 w-5/6 my-5 group mx-auto">
                                        <div className='w-full text-white mx-auto'>
                                            <span>Forgot your password? Not problem, Write your email and we send a link for reset your password.</span>
                                        </div>
                                        <div className='my-6'>
                                            <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
                                                Email
                                            </label>
                                            <input className="shadow border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-neutral-900 focus:border-main" id="email" type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} ref={emailRef} />
                                            <small className="text-red-400">{error}</small>
                                            <small className="text-green-400">{success}</small>
                                        </div>
                                    </div>
                                    <div className="text-center mt-8">
                                        <button className="text-white bg-main font-bold hover:bg-transparent border border-main focus:outline-none focus:ring-blue-300 font-medium rounded-lg  w-5/6 px-5 py-2.5 text-center dark:bg-main dark:hover:bg-transparent dark:focus:ring-violet-900" onClick={handleSubmit}>Send reset link</button>
                                    </div>
                                </form>
                                <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
                                <div className="p-4 flex items-center justify-center my-1">
                                    <span className="font-bold text-sm text-white">Return to<a href="#" className="text-main text-base ml-3 hover:text-emerald-400" onClick={() => handleButtonSignIn()}>Sign in</a></span>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default ForgotPassword;
