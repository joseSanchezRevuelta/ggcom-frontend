import { useEffect, useState } from 'react';
import './App.css';
import Nav from '../Nav/Nav.jsx';
import NavAdmin from '../../componentsAdmin/NavAdmin/NavAdmin.jsx'; // Importa el componente NavAdmin si es necesario
import { useSelector } from 'react-redux';
import { checkUser } from '../../features/users/usersRepository.js';
import { useNavigate } from 'react-router-dom';

function App() {
  const userState = useSelector(state => state.user)
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openForgotPassword, setOpenForgotPassword] = useState(false);
  const [nav, setNav] = useState(false)
  const navigateTo = useNavigate();

  useEffect(() => {
    if (userState.userData.id) {
      checkUser(userState.userData.token)
        .then(response => {
          if (userState.userData.role === 'admin' && response === true) {
            setNav(true)
            // navigateTo('/userlist')
          }
        })
        .catch(error => {
          console.error('Error al verificar el usuario:', error);
        });
    }
  }, [userState])


  return (
    <>
      {
        nav ? <NavAdmin /> : <Nav openSignIn={openSignIn} setOpenSignIn={setOpenSignIn} openSignUp={openSignUp} setOpenSignUp={setOpenSignUp} openForgotPassword={openForgotPassword} setOpenForgotPassword={setOpenForgotPassword} />
      }
      <script type="text/javascript" src="../node"></script>
      <script type="text/javascript" src="../../../node_modules/tw-elements/dist/js/tw-elements.umd.min.js"></script>
    </>
  );
}

export default App;
