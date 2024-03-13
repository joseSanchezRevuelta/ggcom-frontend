import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Community from '../Community/Community';
import Filter from '../../components/Filter/Filter';

// eslint-disable-next-line react/prop-types
function ListCommunities({ id }) {

    const [communities, setCommunities] = useState('');
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const limit = 25;

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchData()
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:8000/communities?page=${page}&limit=${limit}`);
            const data = await response.json();
            if (data.data.length > 0) {
                if (page == 0) {
                    setCommunities(data.data);
                    setPage(prevPage => prevPage + 1);
                } else {
                    setCommunities(prevCommunities => [...prevCommunities, ...data.data]);
                    setPage(prevPage => prevPage + 1);
                }
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error al obtener datos de la API', error);
        }
    };

    return (
        <>
            <Filter setCommunities={setCommunities} />
            <div className='bg-neutral-950 min-h-screen items-center overflow-auto'>
                <div className='lg:w-4/5 text-surface text-white mx-auto'>
                    <a className='block w-full rounded-lg p-4 transition duration-500 hover:bg-zinc-50 hover:text-black focus:bg-zinc-50 focus:text-black focus:ring-0 active:bg-zinc-100 active:text-surface dark:hover:bg-neutral-700/60 dark:hover:text-white dark:focus:bg-neutral-700/60 dark:focus:text-white dark:active:bg-surface dark:active:text-white border border-main flex flex-row justify-between'>
                        <div className='flex-1 text-center'><span>Title</span></div>
                        <div className='flex-1 text-center'><span>Game</span></div>
                        <div className='flex-1 text-center'><span>Created</span></div>
                    </a>
                    <InfiniteScroll
                        dataLength={communities.length}
                        next={fetchData}
                        hasMore={hasMore}
                    // loader={
                    //     <div className="overflow-hidden mt-12">
                    //         <div className="w-full text-center mx-auto text-main">
                    //             <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                    //                 <span className="hidden">Loading...</span>
                    //             </div>
                    //         </div>
                    //     </div>
                    // }
                    // endMessage={<p>No hay más comunidades para cargar.</p>}
                    >
                        {!communities ? (
                            <div className="w-full text-center mx-auto text-main overflow-hidden mt-8">
                                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                                    {/* <span className="text-white">{communities.communities}</span> */}
                                </div>
                            </div>
                        ) : communities.length === 0 ? (
                            <div className='flex items-center justify-center mt-8'>
                                <h1 className='text-white'>No communities found</h1>
                            </div>
                        ) : (
                            communities.map(community => (
                                <Community key={community.id} community={community} />
                            ))
                        )}
                    </InfiniteScroll>
                </div>
            </div >
        </>
    );
}

export default ListCommunities;