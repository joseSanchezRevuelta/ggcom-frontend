import { useState, useEffect } from 'react';
import Title from '../../components/Title/Title.jsx'
import Filter from '../../components/Filter/Filter.jsx'
import Communities from '../../components/Communities/Communities.jsx'
import { getCommunitiesFilter } from '../../features/communities/communityRepository.js';

function Explore() {

    const apiUrl = import.meta.env.VITE_URL;

    const [communities, setCommunities] = useState('');
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [pageFilter, setPageFilter] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const limit = 6;
    const [isFilter, setIsFilter] = useState(false);
    const [handleFilter, setHandleFilter] = useState(false);

    const [search, setSearch] = useState('')
    const [idGame, setIdGame] = useState('')
    const [country, setCountry] = useState('all')
    const [language, setLanguage] = useState('all')
    const [timezone, setTimezone] = useState('all')
    const [order, setOrder] = useState('mostpopular')
    // <Filter setCommunities={setCommunities} setHasMore={setHasMore} search={search} setSearch={setSearch} idGame={idGame} setIdGame={setIdGame} country={country} setCountry={setCountry} language={language} setLanguage={setLanguage} timezone={timezone} setTimezone={setTimezone} order={order} setOrder={setOrder}/>

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchData()
    }, []);

    useEffect(() => {
        setPageFilter(0)
    }, [handleFilter]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(apiUrl + `/communities?page=${page}&limit=${limit}`);
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
                // setHasMore(false);
            }
        } catch (error) {
            console.error('Error al obtener datos de la API', error);
        } finally {
            setLoading(false);
        }
    };

    function fetchDataFilter(search, idGame, country, language, timezone, order) {
        // setCommunities('')
        getCommunitiesFilter(search, idGame, country, language, timezone, order, pageFilter, limit)
            .then(data => {
                setPageFilter(prevPage => prevPage + 1);
                if (data.data.length > 0) {
                    // setIsFilter(true)
                    if (pageFilter == 0) {
                        setCommunities(data.data);
                        setPageFilter(prevPage => prevPage + 1);
                    } else {
                        setCommunities(prevCommunities => [...prevCommunities, ...data.data]);
                        setPageFilter(prevPage => prevPage + 1);
                    }
                } else {
                    // setPageFilter(0)
                    // setIsFilter(false)
                    // setHasMore(false);
                }
                // setCommunities(data)
                // setHasMore(false)
            })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
            })
            .finally(() => {
                // setLoadingJoinCommunity(false);
                // setLoadingLeaveCommunity(false);
            });
        // getCommunitiesFilter(search, idGame, country, language, timezone, order)
        //     .then(data => {
        //         if (data.length > 0) {
        //             if (pageFilter == 0) {
        //                 setCommunities(data.data);
        //                 setPage(prevPageFilter => prevPageFilter + 1);
        //             } else {
        //                 setCommunities(prevCommunities => [...prevCommunities, ...data.data]);
        //                 setPage(prevPageFilter => prevPageFilter + 1);
        //             }
        //         } else {
        //             setHasMore(false);
        //         }
        //     })
        //     .catch(error => {
        //         console.error('Error al obtener los datos:', error);
        //     })
        //     .finally(() => {
        //         // setLoadingJoinCommunity(false);
        //         // setLoadingLeaveCommunity(false);
        //     });
        event.preventDefault();
    };

    const loadMore = () => {
        fetchData();
    };

    const loadMoreFilter = () => {
        fetchDataFilter();
    };

    return (
        <>
            <div className='bg-neutral-950 min-h-screen items-center overflow-auto bg-[url("/img/background_phone.jpg")] lg:bg-[url("/img/w1.jpg")] bg-cover bg-center bg-fixed'>
                <Title title={'Explore Communities'} />
                {/* <Filter setCommunities={setCommunities} setHasMore={setHasMore} /> */}
                <Filter setCommunities={setCommunities} setHasMore={setHasMore} search={search} setSearch={setSearch} idGame={idGame} setIdGame={setIdGame} country={country} setCountry={setCountry} language={language} setLanguage={setLanguage} timezone={timezone} setTimezone={setTimezone} order={order} setOrder={setOrder} fetchDataFilter={fetchDataFilter} setHandleFilter={setHandleFilter}/>
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
                    <>
                        <Communities communities={communities} />
                        {loading ? (
                            <div className="w-full my-6 text-center mx-auto text-main overflow-hidden">
                                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                                    {/* <span className="text-white">{communities.communities}</span> */}
                                </div>
                            </div>
                        ) : (
                            <div className="flex justify-center my-6">
                                {/* {hasMore ? (
                                    <>
                                        {isFilter ? (
                                            <button onClick={loadMoreFilter} className="bg-transparent hover:text-gray-300 text-white font-bold py-2 px-4 rounded border border-main">
                                                Load More communities
                                            </button>
                                        ) : (
                                            <button onClick={loadMore} className="bg-transparent hover:text-gray-300 text-white font-bold py-2 px-4 rounded border border-main">
                                                Load More communities
                                            </button>
                                        )}
                                    </>
                                ) : (
                                    <button className="bg-transparent text-white font-bold py-2 px-4 rounded" disabled>
                                        No more communities
                                    </button>
                                )} */}
                                                                            <button onClick={loadMoreFilter} className="bg-transparent hover:text-gray-300 text-white font-bold py-2 px-4 rounded border border-main">
                                                Load More communities
                                            </button>
                                            <button onClick={loadMore} className="bg-transparent hover:text-gray-300 text-white font-bold py-2 px-4 rounded border border-main">
                                                Load More communities
                                            </button>
                            </div>
                        )}
                    </>
                )}
                                                                            <button onClick={loadMoreFilter} className="bg-transparent hover:text-gray-300 text-white font-bold py-2 px-4 rounded border border-main">
                                                Load More communities
                                            </button>
            </div>
        </>
    );
}

export default Explore;