/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
// import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

const SignUp = ({ openSignUp, setOpenSignUp, setOpenSignIn }) => {

  const cancelButtonRef = useRef(null)

  //OPen modals
  const handleButtonSignIn = () => {
    setOpenSignIn(true);
    setOpenSignUp(false);
  };

  return (
    <Transition.Root show={openSignUp} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setOpenSignUp}>
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-[linear-gradient(to_top,rgba(0,0,0),transparent),url('../../public/img/tarisland3.jpeg')] bg-cover bg-no-repeat bg-center bg-neutral-600 text-left shadow-xl transition-all sm:my-8 w-full sm:w-full max-md:max-w-lg max-lg:max-w-lg lg:max-w-lg xl:max-w-lg 2xl:max-w-lg">
                <div class="p-4 flex items-center justify-center">
                  {/* <button type="button" class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-inset focus:ring-indigo-500">
                                        <span class="sr-only">Close menu</span>
                                        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button> */}
                  <span class="text-white font-bold">Sign up to GGCOM</span>
                </div>
                <hr class="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
                <form class="max-w-md mx-auto my-4 font-bold-600">
                  <div class="relative z-0 w-5/6 mb-5 group mx-auto">
                    <label class="block text-white text-sm font-bold mb-2" for="email">
                      Username:
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-neutral-900 focus:border-main" id="email" type="text" placeholder="Username" />
                  </div>
                  <div class="relative z-0 w-5/6 mb-5 group mx-auto">
                    <label class="block text-white text-sm font-bold mb-2" for="email">
                      Email:
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-neutral-900 focus:border-main" id="email" type="text" placeholder="Email" />
                  </div>
                  <div class="relative z-0 w-5/6 mb-5 group mx-auto">
                    <label class="block text-white text-sm font-bold mb-2" for="email">
                      Confirm Email
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-neutral-900 focus:border-main" id="email" type="text" placeholder="Confirm Email" />
                  </div>
                  <div class="relative z-0 w-5/6 mb-5 group mx-auto">
                    <label class="block text-white text-sm font-bold mb-2" for="email">
                      Password
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-neutral-900 focus:border-main" id="email" type="text" placeholder="Password" />
                  </div>
                  <div class="relative z-0 w-5/6 mb-5 group mx-auto">
                    <label class="block text-white text-sm font-bold mb-2" for="email">
                      Confirm Password
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-neutral-900 focus:border-main" id="email" type="text" placeholder="Confirm Password" />
                  </div>
                  <div class="text-center">
                    <span class="display: block text-xs p-4 font-bold text-white">By clicking register, you indicate that you have read and accept the<br></br><a href='#' class="text-main hover:text-purple-600">Terms and Conditions </a>and the <a href='#' class="text-main hover:text-purple-600">Privacy Policy</a></span>
                  </div>
                  <div class="text-center">
                    <button type="submit" class="text-white bg-blue-700 font-bold hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  w-5/6 px-5 py-2.5 text-center dark:bg-main dark:hover:bg-violet-700 dark:focus:ring-violet-900" onClick={() => setOpenSignUp(false)} ref={cancelButtonRef}>Sign up</button>
                  </div>
                </form>
                <hr class="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
                <div class="p-4 flex items-center justify-center">
                  <span class="font-bold text-sm text-white">You have an account? <a href="#" class="text-main hover:text-purple-600 text-base ml-1" onClick={() => handleButtonSignIn()}>Login</a></span>
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
