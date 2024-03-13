import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Title from '../../../components/Title/Title.jsx'
import ListUsers from '../../../componentsAdmin/ListUsers.jsx/ListUsers.jsx';

function UserList() {

    const userState = useSelector(state => state.user)

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <div className='bg-neutral-950 min-h-screen items-center overflow-auto'>
                <Title title={'User list'} />
                <ListUsers token={userState.userData.token} />
            </div>
        </>
    );
}

export default UserList;