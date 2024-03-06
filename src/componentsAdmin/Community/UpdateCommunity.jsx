import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { geMyCreatedCommunities, getCommunity } from '../../features/community/communityRepository';
import Community from '../Community/Community';
import { useParams } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function UpdateCommunity() {

    const userState = useSelector(state => state.user)

    const { id } = useParams();

    const [community, setCommunity] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchData()
    }, []);

    const fetchData = async () => {
        try {
            getCommunity(id)
                .then(response => {
                    console.log(response)
                    setCommunity(response)
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
                {!community ? (
                    <div className="w-full text-center mx-auto text-main">
                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                            <span className="hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <div className='w-5/6 text-surface text-white mx-auto'>
                        <a className='block w-full rounded-lg p-4 transition duration-500 hover:bg-zinc-50 hover:text-black focus:bg-zinc-50 focus:text-black focus:ring-0 active:bg-zinc-100 active:text-surface dark:hover:bg-neutral-700/60 dark:hover:text-white dark:focus:bg-neutral-700/60 dark:focus:text-white dark:active:bg-surface dark:active:text-white border border-main flex flex-row justify-between'>
                            <div className='flex-1 text-center'><span>Title</span></div>
                            <div className='flex-1 text-center'><span>Game</span></div>
                            <div className='flex-1 text-center'><span>Created</span></div>
                        </a>
                        {community.map(community => (
                            // <User key={user.id} user={user} />
                            <Community key={community.id} community={community}/>
                        ))}
                    </div>
                )}
            </div >
        </>
    );
}

export default UpdateCommunity;