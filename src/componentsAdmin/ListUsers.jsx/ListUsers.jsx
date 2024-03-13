import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getUsers, getUsersFilter } from "../../features/users/usersRepository";
import User from '../User/User';
import FilterUsers from '../Filter/FilterUsers';

// eslint-disable-next-line react/prop-types
function ListUsers({ token }) {

    const [users, setUsers] = useState('');
    const [search, setSearch] = useState('')
    const [order, setOrder] = useState('datedesc')
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const limit = 24;

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchData()
    }, []);

    const fetchData = async () => {
        try {
            getUsers(token, page, limit)
                .then(response => {
                    if (response.length > 0) {
                        if (page == 0) {
                            setUsers(response)
                            setPage(prevPage => prevPage + 1);
                        } else {
                            setUsers(prevCommunities => [...prevCommunities, ...response]);
                            setPage(prevPage => prevPage + 1);
                        }
                    } else {
                        setHasMore(false);
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        } catch (error) {
            console.error('Error al obtener datos de la API', error);
        }
    };

    const handleSearch = (event) => {
        getUsersFilter(search, order)
            .then(data => {
                setUsers(data)
            })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
            })
            .finally(() => {
                // setLoadingJoinCommunity(false);
                // setLoadingLeaveCommunity(false);
            });
        event.preventDefault();
    }


    return (
        <>
            {/* SEARCH */}
            {/* <div className="flex flex-col justify-between w-4/5 mx-auto" data-te-input-wrapper-init id="async">
                <div className="">
                    <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                        <input
                            type="search"
                            className="relative m-0 -mr-0.5 block min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-main focus:text-white focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 focus:border-main dark:focus:border-main"
                            placeholder="Search Users"
                            aria-label="Search"
                            aria-describedby="button-addon1"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        />
                        <button
                            className="relative z-[2] flex items-center rounded-r bg-main px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
                            type="button"
                            id="button-addon1"
                            data-te-ripple-init
                            data-te-ripple-color="light"
                            onClick={handleSearch}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="h-5 w-5">
                                <path
                                    fillRule="evenodd"
                                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                    clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div> */}
            <FilterUsers setUsers={setUsers} />
            {/* USERS */}
            <div className='bg-neutral-950 min-h-screen items-center overflow-auto'>
                <div className='lg:w-4/5 text-surface text-white mx-auto'>
                    <a className='block w-full rounded-lg p-4 transition duration-500 hover:bg-zinc-50 hover:text-black focus:bg-zinc-50 focus:text-black focus:ring-0 active:bg-zinc-100 active:text-surface dark:hover:bg-neutral-700/60 dark:hover:text-white dark:focus:bg-neutral-700/60 dark:focus:text-white dark:active:bg-surface dark:active:text-white border border-main flex flex-row justify-between'>
                        <div className='flex-1 text-center'><span>Username</span></div>
                        <div className='flex-1 text-center'><span>Email</span></div>
                        <div className='flex-1 text-center'><span>Role</span></div>
                        <div className='flex-1 text-center'><span>Created</span></div>
                    </a>
                    <InfiniteScroll
                        dataLength={users.length}
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
                        {/* {!users ? (
                            <div className="w-full text-center mx-auto text-main">
                                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        ) : (
                            users.map(user => (
                                <User key={user.id} user={user} />
                            ))
                        )} */}

                        {!users ? (
                            <div className="w-full text-center mx-auto text-main overflow-hidden mt-8">
                                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                                </div>
                            </div>
                        ) : users.length === 0 ? (
                            <div className='flex items-center justify-center mt-8'>
                                <h1 className='text-white'>No users found</h1>
                            </div>
                        ) : (
                            users.map(user => (
                                <User key={user.id} user={user} />
                            ))
                        )}
                    </InfiniteScroll>
                </div>
            </div >
        </>
    );
}

export default ListUsers;