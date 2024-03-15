import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Title from '../../components/Title/Title.jsx';
import CreateCommunityForm from '../../components/CreateCommunityForm/CreateCommunityForm.jsx'
import Footer from '../../components/Footer/Footer.jsx';
import SignIn from '../../components/SignIn/SignIn.jsx';
import SignUp from '../../components/SignUp/SignUp.jsx';
import ForgotPassword from '../../components/ForgotPassword/ForgotPassword.jsx';

function CreateCommunity() {

    const userState = useSelector(state => state.user)

    const [openSignIn, setOpenSignIn] = useState(false);
    const [openSignUp, setOpenSignUp] = useState(false);
    const [openForgotPassword, setOpenForgotPassword] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <SignIn openSignIn={openSignIn} setOpenSignIn={setOpenSignIn} openSignUp={openSignUp} setOpenSignUp={setOpenSignUp} setOpenForgotPassword={setOpenForgotPassword} />
            <SignUp openSignUp={openSignUp} setOpenSignUp={setOpenSignUp} openSignIn={openSignIn} setOpenSignIn={setOpenSignIn} />
            <ForgotPassword openForgotPassword={openForgotPassword} setOpenForgotPassword={setOpenForgotPassword} setOpenSignIn={setOpenSignIn} />

            <div className='bg-neutral-950 min-h-screen bg-[url("/img/background_phone.jpg")] lg:bg-[url("/img/background_phone.jpg")] lg:bg-[url("/img/w1.jpg")] bg-cover bg-no-repeat bg-center bg-fixed flex flex-col'>
                <Title title={'Create Community'} />
                {Object.keys(userState.userData).length ? (
                    <>
                        <CreateCommunityForm />
                    </>
                ) : (
                    <>
                        <div className='text-center mb-16 xl:mt-6 lg:mb-16 lg:pb-0'>
                            <h1 className='mx-auto my-6 text-white'>Debes iniciar sesión para crear comunidades</h1>
                            <button className="bg-main hover:bg-transparent border border-main text-white font-bold py-2 px-4 mt-4 rounded" onClick={() => setOpenSignIn(true)}>
                                Login for create
                            </button>
                        </div>
                    </>
                )}
                <Footer width={'w-full'} />
            </div>
        </>
    );
}

export default CreateCommunity;