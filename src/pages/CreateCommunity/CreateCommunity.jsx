import { useSelector } from 'react-redux';
import CreateCommunityForm from '../../components/CreateCommunityForm/CreateCommunityForm.jsx'
import Title from '../../components/Title/Title.jsx';
import { useEffect, useState } from 'react';
import Footer from '../../components/Footer/Footer.jsx';
import SignIn from '../../components/SignIn/SignIn.jsx';
import SignUp from '../../components/SignUp/SignUp.jsx';
import ForgotPassword from '../../components/ForgotPassword/ForgotPassword.jsx';

function CreateCommunity() {
    const [openSignIn, setOpenSignIn] = useState(false);
    const [openSignUp, setOpenSignUp] = useState(false);
    const [openForgotPassword, setOpenForgotPassword] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0); // Mueve el scroll al inicio de la página
    }, []);

    const userState = useSelector(state => state.user)

    return (
        <>
            <SignIn openSignIn={openSignIn} setOpenSignIn={setOpenSignIn} openSignUp={openSignUp} setOpenSignUp={setOpenSignUp} setOpenForgotPassword={setOpenForgotPassword} />
            <SignUp openSignUp={openSignUp} setOpenSignUp={setOpenSignUp} openSignIn={openSignIn} setOpenSignIn={setOpenSignIn} />
            <ForgotPassword openForgotPassword={openForgotPassword} setOpenForgotPassword={setOpenForgotPassword} setOpenSignIn={setOpenSignIn} />
            <div className='bg-neutral-950 min-h-screen bg-[url("/img/w1.jpg")] bg-cover bg-no-repeat bg-center bg-fixed flex flex-col'>
                <Title title={'Create Community'} />
                {Object.keys(userState.userData).length ? (
                    <>
                        <CreateCommunityForm />
                    </>
                ) : (
                    <>
                        <div className='text-center mt-6'>
                            <h1 className='mx-auto my-6 text-white'>Debes iniciar sesión para crear comunidades</h1>
                            <button className="bg-main hover:bg-transparent border border-main text-white font-bold py-2 px-4 mt-4 rounded" onClick={() => setOpenSignIn(true)}>
                                Login for create
                            </button>
                        </div>
                    </>
                    // <h1>You haven&apos;t joined any community yet, explore and join!</h1>
                )}
                <Footer width={'w-full'} />
            </div>
        </>
    );
}

export default CreateCommunity;