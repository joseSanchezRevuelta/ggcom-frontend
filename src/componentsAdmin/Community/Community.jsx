/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Community({ community }) {

    useEffect(() => {
        window.scrollTo(0, 0); // Mueve el scroll al inicio de la página
    }, []);

    return (
        <>
            <Link key={community.id} to={`/editcommunity/${community.id}`} className='block w-full cursor-pointer rounded-lg p-4 transition duration-500 hover:bg-zinc-50 hover:text-black focus:bg-zinc-50 focus:text-black focus:ring-0 active:bg-zinc-100 active:text-surface dark:hover:bg-neutral-700/60 dark:hover:text-white dark:focus:bg-neutral-700/60 dark:focus:text-white dark:active:bg-surface dark:active:text-white border border-main flex flex-row justify-between'>
                <div className='flex-1 text-center'><span>{community.title}</span></div>
                <div className='flex-1 text-center'><span>{community.game_name}</span></div>
                <div className='flex-1 text-center'><span>{community.created_at.substring(0, 10)}</span></div>
            </Link>
        </>
    );
}

export default Community;