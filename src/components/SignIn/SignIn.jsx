import './SignIn.css';
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux';
import { loginRepository } from '../../features/users/usersRepository';
import { userdAuth } from '../../features/users/usersSlice';

const SignIn = ({ openSignIn, setOpenSignIn, setOpenSignUp }) => {
  const deviceName = import.meta.env.VITE_DEVICE_BAME;

  // dispatch
  const dispatch = useDispatch();
  const  loginState  = useSelector(state => state.user)  
  
  const emailRef = useRef(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setEmail('')
    setPassword('')
    setError('')
    // espero 0.3 seg para el renderizado
    const timeoutId = setTimeout(() => {
      if (emailRef.current) {
        emailRef.current.focus();
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [openSignIn]);

  const handleCloseSignIn = () => {
    setOpenSignIn(false);
    setError("");
  }

  const handleButtonSignUp = () => {
    setOpenSignIn(false);
    setOpenSignUp(true);
    setError("");
  };

  const handleSubmit = (event) => {
    if (email === "" || password === "") {
      setError("User and password required");
      emailRef.current.focus()
      event.preventDefault();
    } else {
      setError("");
      event.preventDefault();

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
          // 'Authorization': 'Bearer token'
        },
        body: JSON.stringify(
            {
              "data": {
                  "attributes": {
                      "email": email,
                      "password": password,
                      "device_name": deviceName
                  }
              }
          }
        )
      };
      
      // eslint-disable-next-line no-inner-declarations
      async function fetchData() {
        try {
          const data = await dispatch(userdAuth(requestOptions));
            if (data) {
                if (data.payload.success === true) {
                  localStorage.setItem("token_ggcom", data.payload.token)
                  handleCloseSignIn();
                  // window.location.reload();
                } else {
                  setError("Incorrect user or password")
                }
            } else {
              //ERROR
              setError("Incorrect user or password")
            }
        } catch (error) {
          //ERROR
            console.error('Hubo un error en la solicitud:', error);
            setError("Incorrect user or password")
        }
    }
    
    fetchData();
    
      

      // const res = dispatch(userdAuth(requestOptions));
      // console.log(res)
      // console.log(res.data)

      // if (res.success === false) {
      //   setError("Incorrect user or password")
      // } else {
      //   // window.location.reload();
      // }

      // fetch(apiUrl+'/api/login', requestOptions)
      // .then(response => {
      //     if (response.status === 200) {
      //         return response.json();
      //     } else {
      //         console.log('Response status:', response.status);
      //         setError("Incorrect user or password")
      //         return null;
      //     }
      // })
      // .then(data => {
      //     if (data) {
      //         console.log(data);
      //         if (data.success === true) {
      //           window.location.reload();
      //         } else {
      //           setError("Incorrect user or password")
      //         }
      //     } else {
      //         console.error('Unexpected response status');
      //     }
      // })
      // .catch(error => {
      //     console.error('There was a problem with the fetch operation:', error);
      // });
      
      

    }
  };

  return (
    <Transition.Root show={openSignIn} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleCloseSignIn}>
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
                <div className="p-4 flex items-center justify-center">
                  <span className="text-white font-bold">Login to GGCOM</span>
                </div>
                <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
                <form className="max-w-md mx-auto my-10 font-bold-600">
                  <p id="error_signin" className="error_signin text-main2 text-sm text-center font-semibold mb-6">{error}</p>
                  <div className="relative z-0 w-5/6 mb-5 group mx-auto">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
                      Email or Username
                    </label>
                    <input className="shadow border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-neutral-900 focus:border-main" id="email" type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} ref={emailRef} />
                  </div>
                  <div className="relative z-0 w-5/6 mb-5 group mx-auto">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
                      Password
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline bg-neutral-900 focus:border-main" id="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  <div className="text-center mt-7">
                    <button className="text-white bg-indigo-600 font-bold hover:bg-indigo-900 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  w-5/6 px-5 py-2.5 text-center dark:bg-main dark:hover:bg-violet-700 dark:focus:ring-violet-900" onClick={handleSubmit}>Login</button>
                  </div>
                  <div className="flex items-center justify-center my-6">
                    <a className="font-bold text-main text-sm hover:text-purple-600" href="#">Having problems logging in?</a>
                  </div>
                </form>
                <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
                <div className="p-4 flex items-center justify-center my-1">
                  <span className="font-bold text-sm text-white">Need to create an account?<a href="#" className="text-main text-base ml-3 hover:text-purple-600" onClick={() => handleButtonSignUp()}>Sign up</a></span>
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
