import { useEffect } from 'react';
import Title from '../../components/Title/Title.jsx'
import EditProfile from '../../components/EditProfile/EditProfile.jsx'
import { useSelector } from 'react-redux';
import Footer from '../../components/Footer/Footer.jsx';

function Profile() {
    useEffect(() => {
        window.scrollTo(0, 0); // Mueve el scroll al inicio de la página
      }, []);



      const userState = useSelector(state => state.user)
    // console.log(userState.userData.email)
    return (
        <>
            <div className='bg-neutral-950 min-h-screen bg-[url("/img/w1.jpg")] bg-cover bg-no-repeat bg-center bg-fixed'>
                <Title title={'My Profile'} subtitle='' />
                <EditProfile user_id={userState.userData.id} user_name={userState.userData.username} user_email={userState.userData.email}/>
                <Footer width={'w-4/6'}/>
            </div>
        </>
    );
}

export default Profile;