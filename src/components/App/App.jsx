import { useState } from 'react';
import './App.css';
import Nav from '../Nav/Nav.jsx';

function App() {
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);

  return (
    <>
      <Nav openSignIn={openSignIn} setOpenSignIn={setOpenSignIn} openSignUp={openSignUp} setOpenSignUp={setOpenSignUp} />
      {/* <script type="text/javascript" src="../node"></script>
      <script type="text/javascript" src="../../../node_modules/tw-elements/dist/js/tw-elements.umd.min.js"></script> */}
    </>
  )
}

export default App
