import Title from '../../components/Title/Title.jsx'
import Filter from '../../components/Filter/Filter.jsx'
import Communities from '../../components/Communities/Communities.jsx'
import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

function Explore() {
    useEffect(() => {
        window.scrollTo(0, 0);
        fetchData()
    }, []);

    const [communities, setCommunities] = useState('');
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const limit = 12;

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
            <div className='bg-neutral-950 min-h-screen items-center overflow-auto'>
                <Title title={'Explore Communities'} subtitle='Communities' />
                {/* <Search /> */}
                <Filter setCommunities={setCommunities} />
                <InfiniteScroll
                    dataLength={communities.length}
                    next={fetchData}
                    hasMore={hasMore}
                // loader={
                //     <div className="overflow-hidden">
                //         <div className="w-full text-center mx-auto text-main">
                //             <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                //                 <span className="hidden">Loading...</span>
                //             </div>
                //         </div>
                //     </div>
                // }
                // endMessage={<p>No hay más comunidades para cargar.</p>}
                >
                    {/* {communities && (
                        <Communities communities={communities} />
                    )} */}
                    {!communities ? (
                        <div className="w-full text-center mx-auto text-main overflow-hidden">
                            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                                {/* <span className="text-white">{communities.communities}</span> */}
                            </div>
                        </div>
                    ) : communities.length === 0 ? (
                        <div className='flex items-center justify-center'>
                            <h1 className='text-white'>No communities found</h1>
                        </div>
                    ) : (
                        <Communities communities={communities} />
                    )}
                </InfiniteScroll>
            </div>
        </>
    );
}

export default Explore;