/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import './SignUp.css';
import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { userdAuth } from '../../features/users/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { registerRepository } from '../../features/users/usersRepository';
import { XMarkIcon } from '@heroicons/react/24/outline';

const SignUp = ({ openSignUp, setOpenSignUp, setOpenSignIn }) => {
  const deviceName = import.meta.env.VITE_DEVICE_NAME;

  const loginState = useSelector(state => state.user)

  const dispatch = useDispatch();

  const [loadingSignup, setButtonLoadinSignup] = useState(false);

  const usernameRef = useRef(null);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('')
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState({
    usernameError: false,
    usernameErrorText: '',
    emailError: false,
    emailErrorText: '',
    emailConfirmError: false,
    emailConfirmErrorText: '',
    passwordError: false,
    passwordErrorText: '',
    passwordConfirmError: false,
    passwordConfirmErrorText: '',
  });

  //focus en username (hay que esperar 0.3 segundos para que renderice el componente y después poder hacer foco)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (usernameRef.current) {
        usernameRef.current.focus();
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [openSignUp]);

  useEffect(() => {
    checkUsername();
    checkEmail();
    checkPassword();
  }, [username, email, confirmEmail, password, confirmPassword]);

  //Check Username
  const checkUsername = () => {
    if (username === '') {
      setErrors(prevErrors => ({
        ...prevErrors,
        usernameError: false,
        usernameErrorText: '',
      }));
    } else if (username.length < 5) {
      setErrors(prevErrors => ({
        ...prevErrors,
        usernameError: true,
        usernameErrorText: 'Username is too sort (min 5)',
      }));
    } else if (username.length > 20) {
      setErrors(prevErrors => ({
        ...prevErrors,
        usernameError: true,
        usernameErrorText: 'Username is too long (max 20)',
      }));
    } else {
      setErrors(prevErrors => ({
        ...prevErrors,
        usernameError: false,
        usernameErrorText: '',
      }));
    }
  }

  //Check Email
  const checkEmail = () => {
    let expReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email == '') {
      setErrors(prevErrors => ({
        ...prevErrors,
        emailError: false,
        emailConfirmError: false,
        emailErrorText: '',
        emailConfirmErrorText: '',
      }));
    } else if (expReg.test(email) === false) {
      setErrors(prevErrors => ({
        ...prevErrors,
        emailError: true,
        emailConfirmError: false,
        emailErrorText: 'Email must be valid',
        emailConfirmErrorText: '',
      }));
    } else if (confirmEmail != email) {
      setErrors(prevErrors => ({
        ...prevErrors,
        emailError: false,
        emailConfirmError: true,
        emailErrorText: '',
        emailConfirmErrorText: 'Email must match',
      }));
    } else if (confirmEmail == email) {
      setErrors(prevErrors => ({
        ...prevErrors,
        emailError: false,
        emailConfirmError: false,
        emailErrorText: '',
        emailConfirmErrorText: '',
      }));
    }
  }

  //Check Password
  const checkPassword = () => {
    let expRegPass = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,30}$/
    if (password === '') {
      setErrors(prevErrors => ({
        ...prevErrors,
        passwordError: false,
        passwordConfirmError: false,
        passwordErrorText: '',
        passwordConfirmErrorText: '',
      }));
    } else if (password.length < 5) {
      setErrors(prevErrors => ({
        ...prevErrors,
        passwordError: true,
        passwordErrorText: 'Password is too sort (min 5)',
        passwordConfirmError: false,
        passwordConfirmErrorText: '',
      }));
    } else if (password.length > 20) {
      setErrors(prevErrors => ({
        ...prevErrors,
        passwordError: true,
        passwordErrorText: 'Password is too long (max 20)',
        passwordConfirmError: false,
        passwordConfirmErrorText: '',
      }));
    } else if (expRegPass.test(password) === false) {
      setErrors(prevErrors => ({
        ...prevErrors,
        passwordError: true,
        passwordErrorText: 'Required: 1 uppercase, 1 lowercase, 1 number, 1 special character (@, $, !, %, *, ?, &, .)',
        passwordConfirmError: false,
        passwordConfirmErrorText: '',
      }));
    } else if (confirmPassword != password) {
      setErrors(prevErrors => ({
        ...prevErrors,
        passwordError: false,
        passwordConfirmError: true,
        passwordErrorText: '',
        passwordConfirmErrorText: 'Password must match',
      }));
    } else {
      setErrors(prevErrors => ({
        ...prevErrors,
        passwordError: false,
        passwordConfirmError: false,
        passwordErrorText: '',
        passwordConfirmErrorText: '',
      }));
    }
  }

  //Validamos el formulario y enviamos
  const handleSubmit = (event) => {
    let errorUsername = 0
    let errorEmail = 0
    let errorPassword = 0
    //Username
    if (username === "") {
      setErrors(prevErrors => ({
        ...prevErrors,
        usernameError: true,
        usernameErrorText: 'Username required',
      }));
      errorUsername++
    } else if (username.length > 20) {
      setErrors(prevErrors => ({
        ...prevErrors,
        usernameError: true,
        usernameErrorText: 'Username is too long (max 20)',
      }));
      errorUsername++
    } else {
      setErrors(prevErrors => ({
        ...prevErrors,
        usernameError: false,
        usernameErrorText: '',
      }));
      errorUsername = 0
    }
    //Email
    let expRegEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email === "") {
      setErrors(prevErrors => ({
        ...prevErrors,
        emailError: true,
        emailErrorText: 'Email required',
      }));
      errorEmail++
    } else if (expRegEmail.test(email) === false) {
      setErrors(prevErrors => ({
        ...prevErrors,
        emailError: true,
        emailErrorText: 'Email must be valid',
      }));
      errorEmail++
    } else if (confirmEmail != email) {
      setErrors(prevErrors => ({
        ...prevErrors,
        emailError: false,
        emailConfirmError: true,
        emailErrorText: '',
        emailConfirmErrorText: 'Email must match',
      }));
      errorEmail++
    } else {
      setErrors(prevErrors => ({
        ...prevErrors,
        emailError: false,
        emailConfirmError: false,
        emailErrorText: '',
        emailConfirmErrorText: '',
      }));
      errorEmail = 0
    }
    //Password
    let expRegPass = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,30}$/
    if (password === "") {
      setErrors(prevErrors => ({
        ...prevErrors,
        passwordError: true,
        passwordErrorText: 'Password required',
        passwordConfirmError: false,
        passwordConfirmErrorText: '',
      }));
      errorPassword++
    } else if (password.length < 5) {
      setErrors(prevErrors => ({
        ...prevErrors,
        passwordError: true,
        passwordErrorText: 'Password is too sort (min 5)',
        passwordConfirmError: false,
        passwordConfirmErrorText: '',
      }));
      errorPassword++
    } else if (password.length > 20) {
      setErrors(prevErrors => ({
        ...prevErrors,
        passwordError: true,
        passwordErrorText: 'Password is too long (max 20)',
        passwordConfirmError: false,
        passwordConfirmErrorText: '',
      }));
      errorPassword++
    } else if (expRegPass.test(password) === false) {
      setErrors(prevErrors => ({
        ...prevErrors,
        passwordError: true,
        passwordErrorText: 'Required: 1 uppercase, 1 lowercase, 1 number, 1 special character (@, $, !, %, *, ?, &, .)',
        passwordConfirmError: false,
        passwordConfirmErrorText: '',
      }));
    } else if (confirmPassword != password) {
      setErrors(prevErrors => ({
        ...prevErrors,
        passwordError: false,
        passwordConfirmError: true,
        passwordErrorText: '',
        passwordConfirmErrorText: 'Password must match',
      }));
      errorPassword++
    } else {
      errorPassword = 0
    }
    if (errorUsername === 0 && errorEmail === 0 && errorPassword === 0) {
      setErrors(prevErrors => ({
        ...prevErrors,
        usernameError: false,
        usernameErrorText: '',
        emailError: false,
        emailErrorText: '',
        emailConfirmError: false,
        emailConfirmErrorText: '',
        passwordError: false,
        passwordErrorText: '',
        passwordConfirmError: false,
        passwordConfirmErrorText: ''
      }));
      // event.preventDefault();
      // requestOptions
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
                "username": username,
                "password": password,
                "password_confirmation": confirmPassword,
                "device_name": deviceName
              }
            }
          }
        )
      };
      // fetch
      // eslint-disable-next-line no-inner-declarations
      async function fetchData() {
        setButtonLoadinSignup(true)
        try {
          const response = await registerRepository(requestOptions);
          if (response) {
            setButtonLoadinSignup(false)
            if (response.errors && response.errors['data.attributes.email']) {
              setErrors(prevErrors => ({
                ...prevErrors,
                emailError: true,
                emailErrorText: 'Email already used',
              }));

            }
            if (response.errors && response.errors['data.attributes.username']) {
              setErrors(prevErrors => ({
                ...prevErrors,
                usernameErrorError: true,
                usernameErrorText: 'Username already used',
              }));
            }
            if (response.errors && response.errors['data.attributes.password']) {
              setErrors(prevErrors => ({
                ...prevErrors,
                // passwordError: true,
                // passwordErrorText: 'Password must be valid',
                passwordConfirmError: true,
                passwordConfirmErrorText: 'Password must be valid',
              }));

            }
            if (response.success === true) {
              const requestOptionsLogin = {
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
              const data = await dispatch(userdAuth(requestOptionsLogin));
              if (data) {
                if (data.payload.success === true) {
                  localStorage.setItem("data_ggcom", JSON.stringify(data.payload))
                  handleCloseSignUp()
                  // window.location.reload();
                } else {
                  setErrors(prevErrors => ({
                    ...prevErrors,
                    emailError: true,
                    emailErrorText: 'There was a problem, try again',
                  }));
                }
              } else {
                setErrors(prevErrors => ({
                  ...prevErrors,
                  emailError: true,
                  emailErrorText: 'There was a problem, try again later',
                }));
              }
            }
          } else {
            console.log("Ha ocurrido un error")
          }
        } catch (error) {
          setButtonLoadinSignup(false)
          console.error('Hubo un error en la solicitud:', error);
        }
      }

      fetchData();
    }
    event.preventDefault();
  };

  //Cuando pulsamos a signin
  const handleButtonSignIn = () => {
    handleCloseSignUp()
    setOpenSignIn(true)
  };

  //Cuando cerramos el modal
  const handleCloseSignUp = () => {
    setOpenSignUp(false);
    setUsername('')
    setEmail('')
    setConfirmEmail('')
    setPassword('')
    setConfirmPassword('')
    setErrors({
      usernameError: false,
      usernameErrorText: '',
      emailError: false,
      emailErrorText: '',
      emailConfirmError: false,
      emailConfirmErrorText: '',
      passwordError: false,
      passwordErrorText: '',
      passwordConfirmError: false,
      passwordConfirmErrorText: '',
    });
  }

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
          <div className="flex min-h-full items-center justify-center lg:p-4 text-center sm:items-center p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-[linear-gradient(to_top,rgba(0,0,0),transparent),url('/img/signup2.jpg')] bg-cover bg-no-repeat bg-center bg-neutral-600 text-left shadow-xl transition-all sm:my-8 w-full sm:w-full max-md:max-w-lg max-lg:max-w-lg lg:max-w-lg xl:max-w-lg 2xl:max-w-lg">
                <div className="p-4 flex items-center justify-center relative">
                  <span className="text-white font-bold">Sign up to GGCOM</span>
                  <button onClick={handleCloseSignUp} className="absolute top-0 right-0 mt-2 mr-2 focus:outline-none rounded">
                    <XMarkIcon className="h-6 w-6 text-neutral-950 hover:text-main" />
                  </button>
                </div>
                <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
                <form className="max-w-md mx-auto my-4 font-bold-600">
                  <div className="relative z-0 w-5/6 mb-5 group mx-auto">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
                      Username:
                    </label>
                    <input className={`shadow appearance-none ${errors.usernameError ? 'border border-red-400' : 'border'} rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline focus:border-main bg-neutral-900`} id="username" type="text" placeholder="Username" value={username} onChange={(e) => { setUsername(e.target.value); checkUsername(e.target.value); }} ref={usernameRef}
                      autoComplete='off' />
                    <small className="text-red-400">{errors.usernameErrorText}</small>
                  </div>
                  <div className="relative z-0 w-5/6 mb-5 group mx-auto">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
                      Email:
                    </label>
                    <input className={`shadow appearance-none ${errors.emailError ? 'border border-red-400' : 'border'} rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline focus:border-main bg-neutral-900`} id="email" type="text" placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value); checkEmail(e.target.value); }}
                      autoComplete='off' />
                    <small className="text-red-400">{errors.emailErrorText}</small>
                  </div>
                  <div className="relative z-0 w-5/6 mb-5 group mx-auto">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="confirmEmail">
                      Confirm Email
                    </label>
                    <input className={`shadow appearance-none ${errors.emailConfirmError ? 'border border-red-400' : 'border'} rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline focus:border-main bg-neutral-900`} id="confirmEmail" type="text" placeholder="Confirm Email" value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)}
                      autoComplete='off' />
                    <small className="text-red-400">{errors.emailConfirmErrorText}</small>
                  </div>
                  <div className="relative z-0 w-5/6 mb-5 group mx-auto">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
                      Password
                    </label>
                    <input type='password' className={`shadow appearance-none ${errors.passwordError ? 'border border-red-400' : 'border'} rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline focus:border-main bg-neutral-900`} id="password" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value); checkPassword(e.target.value); }}
                      autoComplete='off' />
                    <small className="text-red-400">{errors.passwordErrorText}</small>
                  </div>
                  <div className="relative z-0 w-5/6 mb-5 group mx-auto">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="confirmPassword">
                      Confirm Password
                    </label>
                    <input type='password' className={`shadow appearance-none ${errors.passwordConfirmError ? 'border border-red-400' : 'border'} rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline focus:border-main bg-neutral-900 focus:border-main`} id="confirmPassword" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                      autoComplete='off' />
                    <small className="text-red-400">{errors.passwordConfirmErrorText}</small>
                  </div>
                  <div className="text-center">
                    <span className="display: block text-xs p-4 font-bold text-white">By clicking register, you indicate that you have read and accept the<br></br><a href='#' className="text-main hover:text-emerald-400">Terms and Conditions </a>and the <a href='#' className="text-main hover:text-emerald-400">Privacy Policy</a></span>
                  </div>
                  <div className="text-center">
                    <button type="submit" className="text-white bg-main border border-main font-bold hover:bg-transparent focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  w-5/6 px-5 py-2.5 text-center dark:bg-main dark:hover:bg-transparent dark:focus:ring-violet-900" onClick={handleSubmit}>
                      {loadingSignup ? (
                        <div className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status"></div>
                      ) : (
                        'Sign up'
                      )}
                    </button>
                  </div>
                </form>
                <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
                <div className="p-4 flex items-center justify-center">
                  <span className="font-bold text-sm text-white">You have an account? <a href="#" className="text-main hover:text-emerald-400 text-base ml-1" onClick={() => handleButtonSignIn()}>Login</a></span>
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
