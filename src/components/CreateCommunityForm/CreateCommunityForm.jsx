import { useEffect, useRef, useState } from 'react';
import './CreateCommunityForm.css';
import { useSelector } from 'react-redux';
import { createCommunityRepository } from '../../features/communities/communityRepository';

function CreateCommunityForm() {
    const apiUrl = import.meta.env.VITE_URL;
    const userState = useSelector(state => state.user)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [game, setGame] = useState('')
    const [image, setImage] = useState('')
    const [country, setCountry] = useState('')
    const [language, setLanguage] = useState('')
    const [timezone, setTimezone] = useState('')

    const [countries, setCountries] = useState([]);
    const [countriesArray, setCountriesArray] = useState('')
    const [countriesArray2, setCountriesArray2] = useState('')
    const [flag, setFlag] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [timezones, setTimezones] = useState([]);

    const titleRef = useRef(null);

    const [gameObject, setGameObject] = useState('')
    const [gameSearch, setGameSearch] = useState('')
    const [isOpen, setIsOpen] = useState(false);

    const handleGameSelected = (game) => {
        setIsOpen(false);
        // Lógica adicional al seleccionar un juego
    };

    const handleOutsideClick = (event) => {
        if (!event.target.closest(".autocomplete")) {
            setIsOpen(false);
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
        const gameSought = fetch(`https://api.rawg.io/api/games?key=93fea5c3b3a8428f887fdc7ff376251a&search=${game}&page_size=5`)
            .then(res => res.json())
        gameSought.then(data => {
            // Acceder a los resultados
            const results = data.results;
            setGameSearch(results)

            // Iterar sobre los resultados para obtener los nombres
            // results.forEach(game => {
            //     console.log(game.name); 
            // });
        });
        console.log(gameSearch)
    }

    const gameSelected = (event) => {
        setGame(event.name)
        setImage(event.background_image)
        handleGameSelected(false)
        console.log(game)
        console.log(image)
    }
    const [errors, setErrors] = useState({
        titleError: false,
        titleErrorText: '',
        descriptionError: false,
        descriptionErrorText: '',
        gameError: false,
        gameErrorText: '',
        countryError: false,
        countryErrorText: '',
        languageError: false,
        languageErrorText: '',
        timezoneError: false,
        timezoneErrorText: '',
    });

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
        const timeoutId = setTimeout(() => {
            if (titleRef.current) {
                titleRef.current.focus();
            }
        }, 100);

        return () => clearTimeout(timeoutId);
    }, []);

    //Obtenemos los paises en un array
    useEffect(() => {
        //Array con los paises
        const countriesArray = [];
        countries.forEach(item => {
            const countryName = item.name;
            countriesArray.push(countryName);
        });
        setCountriesArray(countriesArray.sort())
    }, [countries]);

    //Obtenemos los paises en un array
    useEffect(() => {
        //Array con los paises
        const countriesArray2 = [];
        countries.forEach(item => {
            const countryName = item.name;
            const flag = item.flag;
            countriesArray2.push({ "country": countryName, "flag": flag });
        });
        setCountriesArray2(countriesArray2)
    }, [countries]);
    // console.log(countriesArray2)

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

    //select de paises
    const renderCountryOptions = () => {
        return countriesArray2 ? countriesArray2.map(country => (
            //     <option key={country} value={country} className='cursor-pointer'>
            //     {country}
            // </option>
            <option key={country.country} value={JSON.stringify(country)} className='cursor-pointer'>
                {country.country}
            </option>
        )) : null;
    };

    //select de lenguajes
    const renderLanguageOptions = () => {
        return languages ? languages.map((languageObj, index) => (
            <option key={index} value={languageObj.language} className='cursor-pointer'>
                {languageObj}
            </option>
        )) : null;
    };

    //select de timezones
    const renderTimezoneOptions = () => {
        return timezones ? timezones.map((timezonesObj, index) => (
            <option key={index} value={timezonesObj} className='cursor-pointer'>
                {timezonesObj}
            </option>
        )) : null;
    };

    //Validamos el formulario y enviamos
    const handleSubmit = (event) => {
        let errorTitle = 0
        let errorDescription = 0
        let errorGame = 0
        let errorCountry = 0
        let errorLanguage = 0
        let errorTimezone = 0
        //Title
        if (title === "") {
            setErrors(prevErrors => ({
                ...prevErrors,
                titleError: true,
                titleErrorText: 'Title required',
            }));
            errorTitle++
        } else if (title.length < 5) {
            setErrors(prevErrors => ({
                ...prevErrors,
                titleError: true,
                titleErrorText: 'Title is too sort (min 5)',
            }));
            errorTitle++
        } else if (title.length > 200) {
            setErrors(prevErrors => ({
                ...prevErrors,
                titleError: true,
                titleErrorText: 'Title is too long (max 200)',
            }));
            errorTitle++
        } else {
            setErrors(prevErrors => ({
                ...prevErrors,
                titleError: false,
                titleErrorText: '',
            }));
            errorTitle = 0
        }
        //Description
        if (description.length > 200) {
            setErrors(prevErrors => ({
                ...prevErrors,
                descriptionError: true,
                descriptionErrorText: 'Description is too long (max 200)',
            }));
            errorDescription++
        } else {
            setErrors(prevErrors => ({
                ...prevErrors,
                descriptionError: false,
                descriptionErrorText: '',
            }));
            errorDescription = 0
        }
        //Game
        if (game === "") {
            setErrors(prevErrors => ({
                ...prevErrors,
                gameError: true,
                gameErrorText: 'Game is required',
            }));
            errorGame++
        } else {
            setErrors(prevErrors => ({
                ...prevErrors,
                gameError: false,
                gameErrorText: '',
            }));
            errorGame = 0
        }
        //Country
        if (country === "") {
            setErrors(prevErrors => ({
                ...prevErrors,
                countryError: true,
                countryErrorText: 'Country is required',
            }));
            errorCountry++
        } else {
            setErrors(prevErrors => ({
                ...prevErrors,
                countryError: false,
                countryErrorText: '',
            }));
            errorCountry = 0
        }
        //Language
        if (language === "") {
            setErrors(prevErrors => ({
                ...prevErrors,
                languageError: true,
                languageErrorText: 'Language is required',
            }));
            errorLanguage++
        } else {
            setErrors(prevErrors => ({
                ...prevErrors,
                languageError: false,
                languageErrorText: '',
            }));
            errorLanguage = 0
        }
        //Timezone
        if (timezone === "") {
            setErrors(prevErrors => ({
                ...prevErrors,
                timezoneError: true,
                timezoneErrorText: 'Timezone is required',
            }));
            errorTimezone++
        } else {
            setErrors(prevErrors => ({
                ...prevErrors,
                timezoneError: false,
                timezoneErrorText: '',
            }));
            errorTimezone = 0
        }
        if (errorTitle === 0 && errorDescription === 0 && errorGame === 0 && errorCountry === 0 && errorLanguage === 0 && errorTimezone === 0) {
            setErrors(prevErrors => ({
                ...prevErrors,
                titleError: false,
                titleErrorText: '',
                descriptionError: false,
                descriptionErrorText: '',
                gameError: false,
                gameErrorText: '',
                countryError: false,
                countryErrorText: '',
                languageError: false,
                languageErrorText: '',
                timezoneError: false,
                timezoneErrorText: '',
            }));
            event.preventDefault();
            // pasamos country a json y separamos
            const countryObject = JSON.parse(country);
            const countryName = countryObject.country;
            const countryFlag = countryObject.flag;
            // requestOptions
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${userState.userData.token}`
                },
                body: JSON.stringify(
                    {
                        "data": {
                            "attributes": {
                                "user_id": `${userState.userData.id}`,
                                "title": title,
                                "description": description,
                                "country": countryName,
                                "flag": countryFlag,
                                "language": language,
                                "timezone": timezone,
                                "game": game,
                                "image": "https://media.rawg.io/media/games/910/910d547965a5c4928ca19112778a1b4f.jpg"
                            }
                        }
                    }
                )
            };
            //fetch
            console.log(requestOptions)
            createCommunityRepository(requestOptions)
            //eslint-disable-next-line no-inner-declarations
            // async function fetchData() {
            //     console.log(requestOptions)
            //     try {
            //         const response = await fetch(apiUrl + '/api/createcommunity', requestOptions);
            //         if (response.status === 201) {
            //             const data = await response.json();
            //             return data;
            //         } else {
            //             console.error('Response status:', response.status);
            //             const data = await response.json();
            //             return data;
            //         }
            //     } catch (error) {
            //         console.error('Error:', error);
            //         return error;
            //     }
            // }

            // fetchData();
        }
        event.preventDefault();
    };

    return (
        <>
            <div className="relative flex justify-center lg:w-4/6 w-full mx-auto border border-main rounded">
                <form className="lg:w-4/6 sm:w-full mx-auto my-10 font-bold-600 text-left py-8">
                    {/* <p id="error_signin" className="error_signin text-main2 text-sm text-center font-semibold mb-6">{error}</p> */}
                    <div className="relative z-0 w-full my-4 group">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="title">
                            Title Community
                        </label>
                        <input className="shadow border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-neutral-900 focus:border-main" id="title" type="text" placeholder="Title Community" value={title} onChange={(e) => setTitle(e.target.value)} ref={titleRef} />
                        <small className="text-red-400">{errors.titleErrorText}</small>
                    </div>
                    <div className="relative z-0 w-full my-10 group">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="description">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            rows={3}
                            className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6 bg-neutral-900 p-3"
                            placeholder='You can add a description to the community'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <small className="text-red-400">{errors.descriptionError}</small>
                    </div>
                    {/* autoComplete */}
                    <div className="autocomplete relative z-0 my-10 group w-1/2">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="game">
                            Game
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-neutral-900 focus:border-main" id="game" type="text" placeholder="Search game" value={game} onChange={(e) => changeGame(e.target.value)} onFocus={() => setIsOpen(true)}/>
                        {
                            isOpen && gameSearch && (
                                <div className='bg-white rounded-lg shadow-lg z-50 w-full'>
                                    <ul key="ul" className='ml-2'>
                                        {gameSearch.map((game, index) => (
                                            <li className='cursor-pointer hover:bg-gray-500 flex items-center justify-between py-1' key={index} onClick={() => gameSelected(game)}>
                                                <span className="inline-block">{game.name}</span>
                                                <img src={game.background_image} alt={game.name} className="w-8 h-8 mr-2 inline-block mr-12 rounded-full" />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )
                        }


                        <small className="text-red-400">{errors.gameErrorText}</small>
                    </div>
                    {/* /autoComplete */}
                    <div className="relative z-0 w-full my-10 group">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="language">
                            Country
                        </label>
                        <select
                            id="Country"
                            name="country"
                            autoComplete="country-name"
                            placeholder="Country"
                            className="w-full rounded-md py-2 px-1 bg-neutral-900 text-white shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-main lg:max-w-xs w-full text-md sm:leading-6 rounded-md cursor-pointer"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        >
                            <option disabled hidden value="">Select Country</option>
                            <option key="international" value={JSON.stringify({ "country": "international", "flag": "/img/world.png" })} className='cursor-pointer'>
                                International
                            </option>
                            {renderCountryOptions()}
                        </select>
                        <input type="hidden" value={flag} name='flag' />
                        <small className="block mt-1 text-red-400">{errors.countryErrorText}</small>
                    </div>
                    <div className="relative z-0 w-full my-10 group">
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
                            <option disabled hidden value="">Select Language</option>
                            <option key="all" value="All" className='cursor-pointer'>
                                All
                            </option>
                            {renderLanguageOptions()}
                        </select>
                        <small className="block mt-1 text-red-400">{errors.languageErrorText}</small>
                    </div>
                    <div className="relative z-0 w-full my-10 group">
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
                            <option disabled hidden value="">Select Timezone</option>
                            <option key="notspecify" value="Notspecify" className='cursor-pointer'>
                                Not specify
                            </option>
                            {/* <hr className='hr_select'></hr> */}
                            {renderTimezoneOptions()}
                        </select>
                        <small className="block mt-1 text-red-400">{errors.timezoneErrorText}</small>
                    </div>
                    <div className="text-center mt-12">
                        <button className="text-white bg-indigo-600 font-bold hover:bg-indigo-900 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  w-5/6 px-5 py-2.5 text-center dark:bg-main dark:hover:bg-violet-700 dark:focus:ring-violet-900" onClick={handleSubmit}>Create Community</button>
                    </div>
                    <div className="flex items-center justify-center mt-10">
                        <a className="font-bold text-main text-sm hover:text-purple-600" href="#">Having problems create community?</a>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CreateCommunityForm;