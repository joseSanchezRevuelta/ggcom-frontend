import { useEffect, useState } from "react";
import {
    Collapse,
    initTE,
} from "tw-elements";
import { getCommunitiesFilter } from "../../features/communities/communityRepository";
import { getUsersFilter } from "../../features/users/usersRepository";


// eslint-disable-next-line react/prop-types
function FilterUsers({ setUsers }) {
    const [search, setSearch] = useState('')
    const [order, setOrder] = useState('datedesc')
    const [role, setRole] = useState('all')
    const [country, setCountry] = useState('all')
    const [countries, setCountries] = useState([]);
    const [countriesArray, setCountriesArray] = useState('')
    const [language, setLanguage] = useState('all')
    const [renderState, setRenderState] = useState(false)
    const [languages, setLanguages] = useState([]);
    const [timezone, setTimezone] = useState('all')
    const [timezones, setTimezones] = useState([]);

    const [game, setGame] = useState('')
    const [gameConfirmed, setGameConfirmed] = useState('')
    const [idGame, setIdGame] = useState('')
    const [gameObject, setGameObject] = useState('')
    const [gameSearch, setGameSearch] = useState('')
    const [isOpen, setIsOpen] = useState(false);

    const [gameError, setgameError] = useState(false);
    const [gameErrorText, setGameErrorText] = useState(false);

    useEffect(() => {
        setRenderState(true)
    }, [renderState])

    useEffect(() => {
        initTE({ Collapse });
    }, [renderState]);


    const handleOutsideClick = (event) => {
        if (!event.target.closest(".autocomplete")) {
            setIsOpen(false);
            setGameSearch('');
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("click", handleOutsideClick);
        } else {
            document.removeEventListener("click", handleOutsideClick);
        }
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, [isOpen]);

    const handleSearch = (event) => {
        setUsers('')
        getUsersFilter(search, order, role)
            .then(data => {
                console.log(data)
                setUsers(data)
                // setCreatedCommunities(data)
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

    const clearAll = (event) => {
        setSearch('')
        setIdGame('')
        setGame('')
        setGameConfirmed('')
        setOrder('mostpoputar')
        setCountry('all')
        setLanguage('all')
        setTimezone('all')
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <>
            {/* SEARCH */}
            <div className="flex flex-col justify-between w-4/5 mx-auto" data-te-input-wrapper-init id="async">
                <div className="">
                    <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                        <input
                            type="search"
                            className="relative m-0 -mr-0.5 block min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:border-main focus:text-white focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 focus:border-main dark:focus:border-main"
                            placeholder="Search Users"
                            aria-label="Search"
                            aria-describedby="button-addon1"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button
                            className="relative flex items-center rounded-r bg-main px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
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
            </div>
            {/* FILTER */}
            <div className="mb-8 flex flex-row justify-between w-4/5 mx-auto" data-te-input-wrapper-init id="async">
                <div id="accordionExample" className="w-full">
                    <div
                        className="border-b border-neutral-200 bg-white dark:border-neutral-600 dark:bg-transparent">
                        <h2 className="mb-0" id="headingTwo">
                            <button
                                className="group relative flex w-full items-center rounded-none border-0 bg-white px-5 py-4 text-left text-base text-main transition [overflow-anchor:none]  focus:outline-none dark:bg-transparent dark:text-white [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-main [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-transparent dark:[&:not([data-te-collapse-collapsed])]:text-main dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]"
                                type="button"
                                data-te-collapse-init
                                data-te-collapse-collapsed
                                data-te-target="#collapseTwo"
                                aria-expanded="false"
                                aria-controls="collapseTwo">
                                Filters
                                <span
                                    className="-mr-1 ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-0 group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="h-6 w-6">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </span>
                            </button>
                        </h2>
                        <div
                            id="collapseTwo"
                            className="!visible hidden"
                            data-te-collapse-item
                            aria-labelledby="headingTwo"
                            data-te-parent="#accordionExample">
                            <div className="flex flex-row justify-around my-6">
                                <div className='lg:w-2/12 my-4'>
                                    {/* Order */}
                                    <div className="relative z-0 w-full group">
                                        <label className="block text-white text-sm font-bold mb-2" htmlFor="language">
                                            Order
                                        </label>
                                        <select
                                            id="Oder"
                                            name="order"
                                            autoComplete="order-name"
                                            placeholder="Timezone"
                                            className="w-full rounded-md py-2 px-1 bg-transparent text-white shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-main lg:max-w-xs w-full text-md sm:leading-6 rounded-md cursor-pointer overflow-scroll"
                                            value={order}
                                            onChange={(e) => setOrder(e.target.value)}
                                            onKeyPress={handleKeyPress}
                                        // value={timezone}
                                        // onChange={(e) => setTimezone(e.target.value)}
                                        >
                                            {/* <option disabled hidden value="">Select Timezone</option> */}
                                            <option key="datedesc" value="datedesc" className='cursor-pointer bg-neutral-950'>
                                                Date desc
                                            </option>
                                            <option key="dateasc" value="dateasc" className='cursor-pointer bg-neutral-950'>
                                                Date asc
                                            </option>
                                            <option key="usernamedesc" value="usernamedesc" className='cursor-pointer bg-neutral-950'>
                                                Username desc
                                            </option>
                                            <option key="usernameasc" value="usernameasc" className='cursor-pointer bg-neutral-950'>
                                                Username asc
                                            </option>
                                            <option key="emaildesc" value="emaildesc" className='cursor-pointer bg-neutral-950'>
                                                Email desc
                                            </option>
                                            <option key="emailasc" value="emailasc" className='cursor-pointer bg-neutral-950'>
                                                Email asc
                                            </option>
                                            <option key="roledesc" value="roledesc" className='cursor-pointer bg-neutral-950'>
                                                Role desc
                                            </option>
                                            <option key="roleasc" value="roleasc" className='cursor-pointer bg-neutral-950'>
                                                Role asc
                                            </option>
                                            {/* <hr className='hr_select'></hr> */}
                                            {/* {renderTimezoneOptions()} */}
                                        </select>
                                        {/* <small className="block mt-1 text-red-400">{errors.timezoneErrorText}</small> */}
                                    </div>
                                </div>
                                {/* Role */}
                                <div className='w-2/12 my-4'>
                                    <div className="relative z-0 w-full group">
                                        <label className="block text-white text-sm font-bold mb-2" htmlFor="language">
                                            Role
                                        </label>
                                        <select
                                            id="Country"
                                            name="country"
                                            autoComplete="country-name"
                                            placeholder="Country"
                                            className="w-full rounded-md py-2 px-1 bg-neutral-900 text-white shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-main lg:max-w-xs w-full text-md sm:leading-6 rounded-md cursor-pointer overflow-scroll"
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                        >
                                            {/* <option disabled hidden value="">Country</option> */}
                                            <option key="all" value="all" className='cursor-pointer'>
                                                All
                                            </option>
                                            <option key="user" value="user" className='cursor-pointer'>
                                                User
                                            </option>
                                            <option key="admin" value="admin" className='cursor-pointer'>
                                                Admin
                                            </option>
                                        </select>
                                        {/* <input type="hidden" value={flag} name='flag' /> */}
                                        {/* <small className="block mt-1 text-red-400">{errors.countryErrorText}</small> */}
                                    </div>
                                </div>
                            </div>
                            {/* BUTON */}
                            <div className="text-center mb-4">
                                <button className="text-white bg-indigo-600 font-bold hover:bg-indigo-900 focus:outline-none focus:ring-blue-300 font-medium rounded-lg lg:w-1/4 px-5 py-2.5 text-center dark:bg-main dark:hover:bg-violet-700 dark:focus:ring-violet-900 mr-2" onClick={handleSearch}>Apply filters</button>
                                <button className="text-white bg-indigo-600 font-bold hover:bg-indigo-900 focus:outline-none focus:ring-blue-300 font-medium rounded-lg lg:w-1/4 px-5 py-2.5 text-center dark:bg-transparent dark:hover:bg-violet-700 dark:focus:ring-violet-900 border border-neutrañ-500 ml-2" onClick={clearAll}>Clear all</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FilterUsers;