/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function User({ user }) {

    useEffect(() => {
        window.scrollTo(0, 0); // Mueve el scroll al inicio de la página
    }, []);

    return (
        <>
            <Link key={user.id} to={`/edituser/${user.id}/${user.username}/${user.email}/${user.role}`} className='block w-full cursor-pointer rounded-lg p-4 transition duration-500 hover:bg-zinc-50 hover:text-black focus:bg-zinc-50 focus:text-black focus:ring-0 active:bg-zinc-100 active:text-surface dark:hover:bg-neutral-700/60 dark:hover:text-white dark:focus:bg-neutral-700/60 dark:focus:text-white dark:active:bg-surface dark:active:text-white border border-main flex flex-row justify-between'>
                <div className='flex-1 text-center'><span>{user.username}</span></div>
                <div className='flex-1 text-center'><span>{user.email}</span></div>
                <div className='flex-1 text-center'><span>{user.role}</span></div>
                <div className='flex-1 text-center'><span>{user.created_at.substring(0, 10)}</span></div>
            </Link>
        </>
    );
}

export default User;