/* eslint-disable react/prop-types */
import './SignUp.css';
import { Fragment, useEffect, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'

const SignUp = ({ openSignUp, setOpenSignUp, setOpenSignIn }) => {
  //ref a input email para focus
  const usernameRef = useRef(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (usernameRef.current) {
        usernameRef.current.focus();
      }
    }, 300);
  
    return () => clearTimeout(timeoutId);
  }, [openSignUp]);
  

  const handleCloseSignUp = () => {
    setOpenSignUp(false);
    // setError("");
  }

  //OPen modals
  const handleButtonSignIn = () => {
    setOpenSignIn(true);
    setOpenSignUp(false);
  };

  return (
    <Transition.Root show={openSignUp} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleCloseSignUp}>
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-[linear-gradient(to_top,rgba(0,0,0),transparent),url('../../public/img/signup.jpg')] bg-cover bg-no-repeat bg-center bg-neutral-600 text-left shadow-xl transition-all sm:my-8 w-full sm:w-full max-md:max-w-lg max-lg:max-w-lg lg:max-w-lg xl:max-w-lg 2xl:max-w-lg">
                <div className="p-4 flex items-center justify-center">
                  <span className="text-white font-bold">Sign up to GGCOM</span>
                </div>
                <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
                <form className="max-w-md mx-auto my-4 font-bold-600">
                  <div className="relative z-0 w-5/6 mb-5 group mx-auto">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
                      Username:
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-neutral-900 focus:border-main" id="username" type="text" placeholder="Username" ref={usernameRef} />
                  </div>
                  <div className="relative z-0 w-5/6 mb-5 group mx-auto">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
                      Email:
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-neutral-900 focus:border-main" id="email" type="text" placeholder="Email" />
                  </div>
                  <div className="relative z-0 w-5/6 mb-5 group mx-auto">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="confirmEmail">
                      Confirm Email
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-neutral-900 focus:border-main" id="confirmEmail" type="text" placeholder="Confirm Email" />
                  </div>
                  <div className="relative z-0 w-5/6 mb-5 group mx-auto">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
                      Password
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-neutral-900 focus:border-main" id="password" type="text" placeholder="Password" />
                  </div>
                  <div className="relative z-0 w-5/6 mb-5 group mx-auto">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="confirmPassword">
                      Confirm Password
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-neutral-900 focus:border-main" id="confirmPassword" type="text" placeholder="Confirm Password" />
                  </div>
                  <div className="text-center">
                    <span className="display: block text-xs p-4 font-bold text-white">By clicking register, you indicate that you have read and accept the<br></br><a href='#' className="text-main hover:text-purple-600">Terms and Conditions </a>and the <a href='#' className="text-main hover:text-purple-600">Privacy Policy</a></span>
                  </div>
                  <div className="text-center">
                    <button type="submit" className="text-white bg-blue-700 font-bold hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  w-5/6 px-5 py-2.5 text-center dark:bg-main dark:hover:bg-violet-700 dark:focus:ring-violet-900" onClick={() => setOpenSignUp(false)}>Sign up</button>
                  </div>
                </form>
                <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
                <div className="p-4 flex items-center justify-center">
                  <span className="font-bold text-sm text-white">You have an account? <a href="#" className="text-main hover:text-purple-600 text-base ml-1" onClick={() => handleButtonSignIn()}>Login</a></span>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default SignUp;
