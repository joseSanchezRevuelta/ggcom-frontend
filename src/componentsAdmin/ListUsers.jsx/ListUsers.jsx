import { useEffect, useState } from 'react';
import User from '../User/User';
import { getUsers } from "../../features/users/usersRepository";

// eslint-disable-next-line react/prop-types
function ListUsers({ token }) {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchData()
    }, []);

    const fetchData = async () => {
        try {
            getUsers(token)
                .then(response => {
                    console.log(response)
                    setUsers(response)
                })
                .catch(error => {
                    console.log(error)
                })
        } catch (error) {
            console.error('Error al obtener datos de la API', error);
        }
    };

    return (
        <>
            <div className='bg-neutral-950 min-h-screen items-center overflow-auto'>
                {!users ? (
                    <div className="w-full text-center mx-auto text-main">
                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                            <span className="hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <div className='w-5/6 text-surface text-white mx-auto'>
                        <a className='block w-full rounded-lg p-4 transition duration-500 hover:bg-zinc-50 hover:text-black focus:bg-zinc-50 focus:text-black focus:ring-0 active:bg-zinc-100 active:text-surface dark:hover:bg-neutral-700/60 dark:hover:text-white dark:focus:bg-neutral-700/60 dark:focus:text-white dark:active:bg-surface dark:active:text-white border border-main flex flex-row justify-between'>
                            <div className='flex-1 text-center'><span>Username</span></div>
                            <div className='flex-1 text-center'><span>Email</span></div>
                            <div className='flex-1 text-center'><span>Role</span></div>
                            <div className='flex-1 text-center'><span>Created</span></div>
                        </a>

                        {users.map(user => (
                            <User key={user.id} user={user} />
                        ))}
                    </div>
                )}
            </div >
        </>
    );
}

export default ListUsers;