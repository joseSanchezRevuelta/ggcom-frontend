/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function User({ user }) {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Link key={user.id} to={`/edituser/${user.id}/${user.username}/${user.email}/${user.role}`} className='block w-full cursor-pointer rounded-lg p-4 transition duration-500 hover:bg-neutral-700/60 hover:text-black focus:bg-zinc-50 focus:text-black focus:ring-0 active:bg-zinc-100 active:text-surface hover:bg-neutral-700/60 hover:text-white focus:bg-neutral-700/60 focus:text-white active:bg-surface active:text-white border border-main flex flex-row justify-between'>
                <div className='flex-1 text-center text-xs lg:text-base'><span>{user.username}</span></div>
                <div className='flex-1 text-center text-xs lg:text-base'><span>{user.email}</span></div>
                <div className='flex-1 text-center text-xs lg:text-base'><span>{user.role}</span></div>
                <div className='flex-1 text-center text-xs lg:text-base'><span>{user.created_at.substring(0, 10)}</span></div>
            </Link>
        </>
    );
}

export default User;