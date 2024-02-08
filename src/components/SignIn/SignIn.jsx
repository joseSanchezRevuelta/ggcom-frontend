/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
// import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

const SignIn = ({ openSignIn, setOpenSignIn, setOpenSignUp }) => {

  // const cancelButtonRef = useRef(null)

  //Open modals
  const handleButtonSignUp = () => {
    setOpenSignUp(true);
    setOpenSignIn(false);
  };

  // const [formData, setFormData] = useState({
  //   name: '',
  //   email: '',
  // });

  const handleChange = () => {
    // setFormData({
    //   ...formData,
    //   [e.target.name]: e.target.value,
    // });
  };

  return (
    <Transition.Root show={openSignIn} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setOpenSignIn}>
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
                <div class="p-4 flex items-center justify-center">
                  <span class="text-white font-bold">Login to GGCOM</span>
                </div>
                <hr class="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
                <form class="max-w-md mx-auto my-10 font-bold-600">
                  {/* <p class="text-red-500 text-sm text-center">Incorrect data</p> */}
                  <div class="relative z-0 w-5/6 mb-5 group mx-auto">
                    <label class="block text-white text-sm font-bold mb-2" for="email">
                      Email
                    </label>
                    <input class="shadow border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-neutral-900 focus:border-main" id="email" type="text" placeholder="Email" />
                  </div>
                  <div class="relative z-0 w-5/6 mb-5 group mx-auto">
                    <label class="block text-white text-sm font-bold mb-2" for="password">
                      Password
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline bg-neutral-900 focus:border-main" id="password" type="password" placeholder="Password" />
                  </div>
                  <div class="text-center mt-7">
                    <button type="submit" class="text-white bg-indigo-600 font-bold hover:bg-indigo-900 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  w-5/6 px-5 py-2.5 text-center dark:bg-main dark:hover:bg-violet-700 dark:focus:ring-violet-900" onClick={() => handleChange()}>Login</button>
                  </div>
                  <div class="flex items-center justify-center my-6">
                    <a class="font-bold text-main text-sm hover:text-purple-600" href="#">Having problems logging in?</a>
                  </div>
                </form>
                <hr class="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
                <div class="p-4 flex items-center justify-center my-1">
                  <span class="font-bold text-sm text-white">Need to create an account?<a href="#" class="text-main text-base ml-3 hover:text-purple-600" onClick={() => handleButtonSignUp()}>Sign up</a></span>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default SignIn;
