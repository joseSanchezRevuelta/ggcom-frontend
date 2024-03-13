import { useState, useEffect } from 'react';
import Title from '../../components/Title/Title.jsx'
import Filter from '../../components/Filter/Filter.jsx'
import Communities from '../../components/Communities/Communities.jsx'
import Footer from '../../components/Footer/Footer.jsx';

function Explore() {

    const [communities, setCommunities] = useState('');
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const limit = 12;

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchData()
    }, []);

    const fetchData = async () => {
        setLoading(true);
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
        } finally {
            setLoading(false);
        }
    };

    const loadMore = () => {
        fetchData();
    };

    return (
        <>
            <div className='bg-neutral-950 min-h-screen items-center overflow-auto bg-[url("/img/w1.jpg")] bg-cover bg-center bg-fixed flex flex-col'>
                <Title title={'Explore Communities'} />
                <Filter setCommunities={setCommunities} setHasMore={setHasMore}/>
                {!communities ? (
                    <div className="w-full text-center mx-auto text-main overflow-hidden">
                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                        </div>
                    </div>
                ) : communities.length === 0 ? (
                    <div className='flex items-center justify-center'>
                        <h1 className='text-white'>No communities found</h1>
                    </div>
                ) : (
                    <>
                        <Communities communities={communities} />
                        {loading ? (
                            <div className="w-full my-6 text-center mx-auto text-main overflow-hidden">
                                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                                </div>
                            </div>
                        ) : (
                            <div className="flex justify-center my-6">
                                {hasMore ? (
                                    <button onClick={loadMore} className="bg-transparent hover:text-gray-300 text-white font-bold py-2 px-4 rounded border border-main">
                                        Load More communities
                                    </button>
                                ) : (
                                    <button className="bg-transparent text-white font-bold py-2 px-4 rounded" disabled>
                                        No more communities
                                    </button>
                                )}
                            </div>
                        )}
                    </>
                )}
                <Footer width={'w-full'}/>
            </div>
        </>
    );
}

export default Explore;