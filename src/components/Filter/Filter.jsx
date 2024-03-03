import { useEffect, useState } from "react";
import {
    Collapse,
    initTE,
} from "tw-elements";


function Filter() {
    const [countries, setCountries] = useState([]);
    const [countriesArray, setCountriesArray] = useState('')
    const [renderState, setRenderState] = useState(false)

    useEffect(() => {
        setRenderState(true)
    }, [renderState])

    useEffect(() => {
        initTE({ Collapse });
    }, [renderState]);

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
            const countryName = item.name;
            const flag = item.flag;
            countriesArray.push({ "country": countryName, "flag": flag });
        });
        setCountriesArray(countriesArray)
    }, [countries]);

    //select de paises
    const renderCountryOptions = () => {
        return countriesArray ? countriesArray.map(country => (
            <option key={country.country} value={JSON.stringify(country)} className='cursor-pointer'>
                {country.country}
            </option>
        )) : null;
    };

    return (
        <>
            <div className="mb-8 flex flex-row justify-between w-4/5 mx-auto" data-te-input-wrapper-init id="async">
                <div id="accordionExample" className="w-full">
                    <div
                        className="border-b border-neutral-200 bg-white dark:border-neutral-600 dark:bg-transparent">
                        <h2 className="mb-0" id="headingTwo">
                            <button
                                className="group relative flex w-full items-center rounded-none border-0 bg-white px-5 py-4 text-left text-base text-main transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-transparent dark:text-white [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-main [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-transparent dark:[&:not([data-te-collapse-collapsed])]:text-main dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]"
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
                            <div className="flex flex-row justify-between">
                                <div className='w-2/12 my-4'>
                                    {/* Order */}
                                    <div className="relative z-0 w-full group">
                                        {/* <label className="block text-white text-sm font-bold mb-2" htmlFor="language">
                                        Order
                                    </label> */}
                                        <select
                                            id="Oder"
                                            name="order"
                                            autoComplete="order-name"
                                            placeholder="Timezone"
                                            className="w-full rounded-md py-2 px-1 bg-transparent text-white shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-main lg:max-w-xs w-full text-md sm:leading-6 rounded-md cursor-pointer"
                                        // value={timezone}
                                        // onChange={(e) => setTimezone(e.target.value)}
                                        >
                                            {/* <option disabled hidden value="">Select Timezone</option> */}
                                            <option key="popular" value="Notspecify" className='cursor-pointer bg-neutral-950'>
                                                Most popular
                                            </option>
                                            <option key="people" value="Notspecify" className='cursor-pointer bg-neutral-950'>
                                                More people
                                            </option>
                                            <option key="comments" value="Notspecify" className='cursor-pointer bg-neutral-950'>
                                                More comments
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
                                        {/* <label className="block text-white text-sm font-bold mb-2" htmlFor="language">
                                        Order
                                    </label> */}
                                        <select
                                            id="Oder"
                                            name="order"
                                            autoComplete="order-name"
                                            placeholder="Timezone"
                                            className="w-full rounded-md py-2 px-1 bg-neutral-950 text-white shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-main lg:max-w-xs w-full text-md sm:leading-6 rounded-md cursor-pointer"
                                        // value={timezone}
                                        // onChange={(e) => setTimezone(e.target.value)}
                                        >
                                            <option key="country" value="Notspecify" className='cursor-pointer'>
                                                Country
                                            </option>
                                            {/* <hr className='hr_select'></hr> */}
                                            {renderCountryOptions()}
                                        </select>
                                        {/* <small className="block mt-1 text-red-400">{errors.timezoneErrorText}</small> */}
                                    </div>
                                </div>
                                {/* Language */}
                                <div className='w-2/12 my-4'>
                                    <div className="relative z-0 w-full group">
                                        {/* <label className="block text-white text-sm font-bold mb-2" htmlFor="language">
                                        Order
                                    </label> */}
                                        <select
                                            id="Oder"
                                            name="order"
                                            autoComplete="order-name"
                                            placeholder="Timezone"
                                            className="w-full rounded-md py-2 px-1 bg-neutral-950 text-white shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-main lg:max-w-xs w-full text-md sm:leading-6 rounded-md cursor-pointer"
                                        // value={timezone}
                                        // onChange={(e) => setTimezone(e.target.value)}
                                        >
                                            <option key="language" value="Notspecify" className='cursor-pointer'>
                                                Language
                                            </option>
                                            {/* <hr className='hr_select'></hr> */}
                                            {renderCountryOptions()}
                                        </select>
                                        {/* <small className="block mt-1 text-red-400">{errors.timezoneErrorText}</small> */}
                                    </div>
                                </div>
                                {/* Timezone */}
                                <div className='w-2/12 my-4'>
                                    <div className="relative z-0 w-full group">
                                        {/* <label className="block text-white text-sm font-bold mb-2" htmlFor="language">
                                        Order
                                    </label> */}
                                        <select
                                            id="Oder"
                                            name="order"
                                            autoComplete="order-name"
                                            placeholder="Timezone"
                                            className="w-full rounded-md py-2 px-1 bg-neutral-950 text-white shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-main lg:max-w-xs w-full text-md sm:leading-6 rounded-md cursor-pointer"
                                        // value={timezone}
                                        // onChange={(e) => setTimezone(e.target.value)}
                                        >
                                            <option key="timezone" value="Notspecify" className='cursor-pointer'>
                                                Timezone
                                            </option>
                                            {/* <hr className='hr_select'></hr> */}
                                            {renderCountryOptions()}
                                        </select>
                                        {/* <small className="block mt-1 text-red-400">{errors.timezoneErrorText}</small> */}
                                    </div>
                                </div>
                            </div>
                            {/* GAME */}
                            <div className="w-full">
                                {/* autoComplete */}
                                <div className="autocomplete relative z-0 mt-2 mb-4 group w-full mx-auto">
                                    {/* <label className="block text-white text-sm font-bold mb-2" htmlFor="game">
                                        Game
                                    </label> */}
                                    <input className="shadow appearance-none border border-neutral-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-transparent focus:border-main" id="game" type="text" placeholder="Search game" />
                                    {/* {
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
                                    } */}
                                    {/* <small className="text-red-400">{errors.gameErrorText}</small> */}
                                </div>
                            </div>
                            {/* BUTON */}
                            <div className="text-center mb-4">
                                <button className="text-white bg-indigo-600 font-bold hover:bg-indigo-900 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-1/3 px-5 py-2.5 text-center dark:bg-main dark:hover:bg-violet-700 dark:focus:ring-violet-900">Apply filters</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Filter;