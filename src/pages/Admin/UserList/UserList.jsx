import { useEffect } from 'react';
import Title from '../../../components/Title/Title.jsx'
import ListUsers from '../../../componentsAdmin/ListUsers.jsx/ListUsers.jsx';
import { useSelector } from 'react-redux';

function UserList() {

    const userState = useSelector(state => state.user)

    useEffect(() => {
        window.scrollTo(0, 0); // Mueve el scroll al inicio de la página
    }, []);

    return (
        <>
            <div className='bg-neutral-950 min-h-screen items-center overflow-auto'>
                <Title title={'User list'} />
                {/* <div className='text-center lg:w-4/5 mx-auto pt-16 bg-red-400'> */}
                <ListUsers token={userState.userData.token} />
                {/* </div> */}
            </div>
        </>
    );
}

export default UserList;