import { useState } from 'react';

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