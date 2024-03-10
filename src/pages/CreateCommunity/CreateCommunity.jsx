import { useSelector } from 'react-redux';
import CreateCommunityForm from '../../components/CreateCommunityForm/CreateCommunityForm.jsx'
import Title from '../../components/Title/Title.jsx';
import { useEffect } from 'react';

function CreateCommunity() {
    useEffect(() => {
        window.scrollTo(0, 0); // Mueve el scroll al inicio de la página
      }, []);

    const userState = useSelector(state => state.user)

    return (
        <>
            <div className='bg-neutral-950 min-h-screen bg-[url("/img/w1.jpg")] bg-cover bg-no-repeat bg-center bg-fixed'>
            <Title title={'Create Community'} subtitle='Create your communities' />
                {Object.keys(userState.userData).length ? (
                    <>
                        <CreateCommunityForm />
                    </>
                ) : (
                    <>
                        <div className='text-center bg-neutral-950'>
                            <h1 className='mx-auto my-6 text-white'>Debes iniciar sesión para crear y unirte a comunidades</h1>
                            <button className="mx-auto mt-6 bg-main hover:bg-transparent border border-transparent hover:border-main text-white font-bold py-2 px-4 rounded mx-2" onClick={() => setOpenSignIn(true)}>
                                Login
                            </button>
                        </div>
                    </>
                    // <h1>You haven&apos;t joined any community yet, explore and join!</h1>
                )}
            </div>
        </>
    );
}

export default CreateCommunity;