import { useEffect } from 'react';
import Title from '../../components/Title/Title.jsx'

function Profile() {
    useEffect(() => {
        window.scrollTo(0, 0); // Mueve el scroll al inicio de la página
      }, []);
      
    return (
        <>
            <div className='bg-neutral-950'>
                <Title title={'My Profile'} subtitle='' />
            </div>
        </>
    );
}

export default Profile;