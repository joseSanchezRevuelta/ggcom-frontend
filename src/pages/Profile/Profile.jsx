import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Title from '../../components/Title/Title.jsx'
import EditProfile from '../../components/EditProfile/EditProfile.jsx'
import Footer from '../../components/Footer/Footer.jsx';

function Profile() {

    const userState = useSelector(state => state.user)

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <div className='bg-neutral-950 min-h-screen bg-[url("/img/background_phone.jpg")] lg:bg-[url("/img/w1.jpg")] bg-cover bg-no-repeat bg-center bg-fixed'>
                <Title title={'My Profile'} subtitle='' />
                <EditProfile user_id={userState.userData.id} user_name={userState.userData.username} user_email={userState.userData.email} />
                <Footer width={'w-full'} />
            </div>
        </>
    );
}

export default Profile;