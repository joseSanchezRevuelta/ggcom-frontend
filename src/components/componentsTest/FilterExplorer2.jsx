import { useEffect, useState } from "react";
import {
    Collapse,
    initTE,
} from "tw-elements";
import { getCommunitiesFilter } from "../../features/communities/communityRepository";


// eslint-disable-next-line react/prop-types
function Filter({ setCommunities, setHasMore, search, setSearch, idGame, setIdGame, country, setCountry, language, setLanguage, timezone, setTimezone, order, setOrder, fetchDataFilter, setHandleFilter }) {
    // const [search, setSearch] = useState('')
    // const [order, setOrder] = useState('mostpopular')
    // const [country, setCountry] = useState('all')
    const [countries, setCountries] = useState([]);
    const [countriesArray, setCountriesArray] = useState('')
    // const [language, setLanguage] = useState('all')
    const [renderState, setRenderState] = useState(false)
    const [languages, setLanguages] = useState([]);
    // const [timezone, setTimezone] = useState('all')
    const [timezones, setTimezones] = useState([]);

    const [game, setGame] = useState('')
    const [gameConfirmed, setGameConfirmed] = useState('')
    // const [idGame, setIdGame] = useState('')
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

    //COUNTRIES
    //Obtenemos datos de los paises
    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (!data) {
                    throw new Error('Data is null or undefined');
                }
                // Mapear los datos para extraer el nombre, la bandera y los lenguajes
                const countriesData = data.map(country => ({
                    name: country.name.common,
                    flag: country.flags.svg,
                    languages: country.languages,
                    timezones: country.timezones
                }));
                setCountries(countriesData);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });

        // espero 0.1 seg para el renderizado
        // const timeoutId = setTimeout(() => {
        //     if (titleRef.current) {
        //         titleRef.current.focus();
        //     }
        // }, 100);

        // return () => clearTimeout(timeoutId);
    }, []);

    //Obtenemos los paises en un array
    useEffect(() => {
        //Array con los paises
        const countriesArray = [];
        countries.forEach(item => {
            countriesArray.push(item.name);
        });
        setCountriesArray(countriesArray.sort())
    }, [countries]);

    //select de paises
    const renderCountryOptions = () => {
        return countriesArray ? countriesArray.map(country => (
            <option key={country} value={country} className='cursor-pointer'>
                {country}
            </option>
        )) : null;
    };

    //LANGUAGES
    //Obtenemos los lenguajes de los paises
    useEffect(() => {
        //Array con los lenguajes
        const languagesArray = [];
        const insertedLanguages = []; // Arreglo para comprobar repetidos

        countries.forEach(item => {
            for (const langCode in item.languages) {
                const language = item.languages[langCode];
                if (!insertedLanguages.includes(language)) { // Verificar si el idioma ya ha sido insertado
                    languagesArray.push(language); // Agregar el idioma a languagesArray
                    // languagesArray.push({ language }); // Agregar el idioma a languagesArray
                    insertedLanguages.push(language); // Agregar el idioma al arreglo de idiomas insertados
                }
            }
        });
        setLanguages(languagesArray.sort());
    }, [countries]);

    //select de lenguajes
    const renderLanguageOptions = () => {
        return languages ? languages.map((languageObj, index) => (
            <option key={index} value={languageObj.language} className='cursor-pointer'>
                {languageObj}
            </option>
        )) : null;
    };

    //TIMEZONES
    //Obtenemos las zonas horarias de los paises
    useEffect(() => {
        //Array con las zonas horarias
        const timezonesArray = [];

        countries.forEach(item => {
            for (const timezonesCode in item.timezones) {
                const timezone = item.timezones[timezonesCode];
                if (timezone !== 'UTC' && !timezonesArray.some(tz => tz === timezone)) {  //comprobar repetidos
                    timezonesArray.push(
                        timezone
                    );
                }
            }
        });
        setTimezones(timezonesArray.sort());
    }, [countries]);

    //select de timezones
    const renderTimezoneOptions = () => {
        return timezones ? timezones.map((timezonesObj, index) => (
            <option key={index} value={timezonesObj} className='cursor-pointer'>
                {timezonesObj}
            </option>
        )) : null;
    };

    //Games
    const handleGameSelected = (game) => {
        setIsOpen(false);
    };

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

    const changeGame = (event) => {
        setGame(event)
        setGameConfirmed('')
        const gameSought = fetch(`https://api.rawg.io/api/games?key=93fea5c3b3a8428f887fdc7ff376251a&search=${game}&page_size=5&ordering=-rating&ordering=-popularity`)
            .then(res => res.json())
        gameSought.then(data => {
            // Acceder a los resultados
            // const results = data.results.filter(game => game.rating > 5);
            const results = data.results;
            setGameSearch(results)
        });
    }

    const gameSelected = (event) => {
        setGame(event.name)
        setGameConfirmed(event.name)
        setIdGame(event.id)
        handleGameSelected(false)
    }

    const handleSubmit = (event) => {
        let errorGame = 0
        if (game != "" && gameConfirmed === "") {
            setGameErrorText('Please select a game from the search')
            errorGame++
        }
        if (errorGame === 0) {
            setHandleFilter(prevState => !prevState)
            setGameErrorText('')
            setCommunities('')
            fetchDataFilter(search, idGame, country, language, timezone, order)
        }
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
                            className="relative m-0 -mr-0.5 block min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-neutral-950 bg-clip-padding px-3 text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-main focus:text-white focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 focus:border-main dark:focus:border-main"
                            placeholder="Search Communities"
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
                            onClick={handleSubmit}
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
            <div className="mb-8 flex flex-row justify-between w-4/5 mx-auto rounded-l" data-te-input-wrapper-init id="async">
                <div id="accordionExample" className="w-full">
                    <div
                        className="border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-transparent rounded-l">
                        <h2 className="mb-0" id="headingTwo">
                            <button
                                className="group relative flex w-full items-center rounded-l border-0 bg-white px-5 py-4 text-left text-base text-main transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-950 dark:text-white [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-main [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-transparent dark:[&:not([data-te-collapse-collapsed])]:text-main dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]"
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
                            <div className="flex flex-row justify-between w-11/12 mx-auto">
                                <div className='w-2/12 my-4'>
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
                                            <option key="mostpopular" value="mostpopular" className='cursor-pointer bg-neutral-950'>
                                                Most popular
                                            </option>
                                            <option key="lesspopular" value="lesspopular" className='cursor-pointer bg-neutral-950'>
                                                Less popular
                                            </option>
                                            <option key="morepeople" value="morepeople" className='cursor-pointer bg-neutral-950'>
                                                More people
                                            </option>
                                            <option key="lesspeople" value="lesspeople" className='cursor-pointer bg-neutral-950'>
                                                Less people
                                            </option>
                                            {/* <hr className='hr_select'></hr> */}
                                            {/* {renderTimezoneOptions()} */}
                                        </select>
                                        {/* <small className="block mt-1 text-red-400">{errors.timezoneErrorText}</small> */}
                                    </div>
                                </div>
                                {/* Country */}
                                <div className='w-2/12 my-4'>
                                    <div className="relative z-0 w-full group">
                                        <label className="block text-white text-sm font-bold mb-2" htmlFor="language">
                                            Country
                                        </label>
                                        <select
                                            id="Country"
                                            name="country"
                                            autoComplete="country-name"
                                            placeholder="Country"
                                            className="w-full rounded-md py-2 px-1 bg-neutral-900 text-white shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-main lg:max-w-xs w-full text-md sm:leading-6 rounded-md cursor-pointer overflow-scroll"
                                            value={country}
                                            onChange={(e) => setCountry(e.target.value)}
                                        >
                                            {/* <option disabled hidden value="">Country</option> */}
                                            <option key="allCountry" value="all" className='cursor-pointer'>
                                                All
                                            </option>
                                            <option key="international" value={JSON.stringify({ "country": "international", "flag": "/img/world.png" })} className='cursor-pointer'>
                                                International
                                            </option>
                                            {renderCountryOptions()}
                                        </select>
                                        {/* <input type="hidden" value={flag} name='flag' /> */}
                                        {/* <small className="block mt-1 text-red-400">{errors.countryErrorText}</small> */}
                                    </div>
                                </div>
                                {/* Language */}
                                <div className='w-2/12 my-4'>
                                    <div className="relative z-0 w-full group">
                                        <label className="block text-white text-sm font-bold mb-2" htmlFor="language">
                                            Language
                                        </label>
                                        <select
                                            id="language"
                                            name="language"
                                            autoComplete="language-name"
                                            placeholder="Language"
                                            className="w-full rounded-md py-2 px-1 bg-neutral-900 text-white shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-main lg:max-w-xs w-full text-md sm:leading-6 rounded-md cursor-pointer"
                                            value={language}
                                            onChange={(e) => setLanguage(e.target.value)}
                                        >
                                            {/* <option disabled hidden value="">Language</option> */}
                                            <option key="alllanguage" value="all" className='cursor-pointer'>
                                                All
                                            </option>
                                            {renderLanguageOptions()}
                                        </select>
                                        {/* <small className="block mt-1 text-red-400">{errors.languageErrorText}</small> */}
                                    </div>
                                </div>
                                {/* Timezone */}
                                <div className='w-2/12 my-4'>
                                    <div className="relative z-0 w-ful group">
                                        <label className="block text-white text-sm font-bold mb-2" htmlFor="language">
                                            Timezone
                                        </label>
                                        <select
                                            id="Timezone"
                                            name="timezone"
                                            autoComplete="timezone-name"
                                            placeholder="Timezone"
                                            className="w-full rounded-md py-2 px-1 bg-neutral-900 text-white shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-main lg:max-w-xs w-full text-md sm:leading-6 rounded-md cursor-pointer"
                                            value={timezone}
                                            onChange={(e) => setTimezone(e.target.value)}
                                        >
                                            {/* <option disabled hidden value="">Select Timezone</option> */}
                                            <option key="alltimezone" value="all" className='cursor-pointer'>
                                                All
                                            </option>
                                            {/* <hr className='hr_select'></hr> */}
                                            {renderTimezoneOptions()}
                                        </select>
                                        {/* <small className="block mt-1 text-red-400">{errors.timezoneErrorText}</small> */}
                                    </div>
                                </div>
                            </div>
                            {/* GAME */}
                            <div className="w-11/12 mx-auto">
                                {/* autoComplete */}
                                <div className="autocomplete relative z-0 mt-2 mb-6 group w-full mx-auto">
                                    <label className="block text-white text-sm font-bold mb-2" htmlFor="game">
                                        Game
                                    </label>
                                    <input className="shadow appearance-none border border-neutral-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-transparent focus:border-main" id="game" type="text" placeholder="Search game" value={game} onChange={(e) => changeGame(e.target.value)} onFocus={() => setIsOpen(true)} />
                                    {
                                        isOpen && gameSearch && (
                                            <div className='bg-white rounded-lg shadow-lg z-50 w-full'>
                                                <ul key="ul" className='ml-2'>
                                                    {gameSearch.map((game, index) => (
                                                        <li className='cursor-pointer hover:bg-gray-500 flex items-center justify-between py-1' key={index} onClick={() => gameSelected(game)}>
                                                            <span className="inline-block">{game.name}</span>
                                                            <img src={game.background_image} alt={game.name} className="w-8 h-8 mr-2 inline-block mr-12 rounded-full object-cover object-center" />
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )
                                    }
                                    <small className="text-red-400">{gameErrorText}</small>
                                </div>
                            </div>
                            {/* BUTON */}
                            <div className="text-center mb-4">
                                <button className="text-white bg-indigo-600 font-bold hover:bg-indigo-900 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-1/4 px-5 py-2.5 text-center dark:bg-main dark:hover:bg-violet-700 dark:focus:ring-violet-900 mr-2" onClick={handleSubmit}>Apply filters</button>
                                <button className="text-white bg-indigo-600 font-bold hover:bg-indigo-900 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-1/4 px-5 py-2.5 text-center dark:bg-transparent dark:hover:bg-violet-700 dark:focus:ring-violet-900 border border-neutrañ-500 ml-2" onClick={clearAll}>Clear all</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Filter;