import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getCommunity, updateCommunity } from '../../features/communities/communityRepository';
import { Link, useNavigate } from 'react-router-dom';
import Delete from '../Delete/Delete';

function EditCommunityForm({ community_id, user_id, user_role }) {
    const userState = useSelector(state => state.user)

    const [idUser, setIdUser] = useState('')
    const [idCommunity, setIdCommunity] = useState('')
    const [idGame, setIdGame] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [game, setGame] = useState('')
    const [gameConfirmed, setGameConfirmed] = useState('')
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
    const [renderData, setRenderData] = useState(false)

    const titleRef = useRef(null);

    const [gameObject, setGameObject] = useState('')
    const [gameSearch, setGameSearch] = useState('')
    const [isOpen, setIsOpen] = useState(false);

    const [communityData, setCommunityData] = useState([]);

    const [openDelete, setOpenDelete] = useState(false);

    const [loadingEditCommunity, setLoadingEditCommunity] = useState(false);
    const [loadingButtonEditCommunity, setButtonLoadingEditCommunity] = useState(false);

    const navigateTo = useNavigate();
    // fetch a comunidad
    useEffect(() => {
        setLoadingEditCommunity(true)
        getCommunity(community_id)
            .then(data => {
                setLoadingEditCommunity(false)
                setCommunityData(data);
                if (user_id != data.user_id && user_role != 'admin') {
                    navigateTo('/notfound')
                }
            })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
            });
    }, [community_id]);

    useEffect(() => {
        setIdUser(communityData.user_id)
        setIdCommunity(communityData.id)
        setTitle(communityData.title);
        setDescription(communityData.description);
        const countryObject = {
            country: communityData.country,
            flag: communityData.flag
        };
        const countryJSON = JSON.stringify(countryObject);
        setCountry(countryJSON);
        setLanguage(communityData.language);
        setTimezone(communityData.timezone);
        //GAME
        setGame(communityData.game_name)
        setGameConfirmed(communityData.game_name)
        setIdGame(communityData.game_id)
        setImage(communityData.game_image)
        handleGameSelected(false)
    }, [communityData]);


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
        const gameSought = fetch(`https://api.rawg.io/api/games?key=93fea5c3b3a8428f887fdc7ff376251a&search=${game}&page_size=10&ordering=-rating&ordering=-popularity`)
            .then(res => res.json())
        gameSought.then(data => {
            const results = data.results;
            setGameSearch(results)
        });
    }

    const gameSelected = (event) => {
        setGame(event.name)
        setGameConfirmed(event.name)
        setIdGame(event.id)
        setImage(event.background_image)
        handleGameSelected(false)
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
        const compareByCountry = (a, b) => {
            if (a.country < b.country) {
                return -1;
            }
            if (a.country > b.country) {
                return 1;
            }
            return 0;
        };

        // Ordenar el array de países por el nombre del país
        const sortedCountriesArray2 = countriesArray2.sort(compareByCountry);

        setCountriesArray2(sortedCountriesArray2);
    }, [countries]);

    //Obtenemos los lenguajes de los paises
    useEffect(() => {
        //Array con los lenguajes
        const languagesArray = [];
        const insertedLanguages = []; // Arreglo para comprobar repetidos

        countries.forEach(item => {
            for (const langCode in item.languages) {
                const language = item.languages[langCode];
                if (!insertedLanguages.includes(language)) { // Verificar si el idioma ya ha sido insertado
                    languagesArray.push(language);
                    insertedLanguages.push(language);
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
        } else if (title.length > 50) {
            setErrors(prevErrors => ({
                ...prevErrors,
                titleError: true,
                titleErrorText: 'Title is too long (max 50)',
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
        if (description === "")  {
            setErrors(prevErrors => ({
                ...prevErrors,
                descriptionError: true,
                descriptionErrorText: 'Description is required',
            }));
            errorDescription++
        } else if (description.length < 5) {
            setErrors(prevErrors => ({
                ...prevErrors,
                descriptionError: true,
                descriptionErrorText: 'Description is too sort (min 5)',
            }));
            errorDescription++
        } else if (description.length > 200) {
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
        } else if (gameConfirmed === "") {
            setErrors(prevErrors => ({
                ...prevErrors,
                gameError: true,
                gameErrorText: 'Please select a game from the search',
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
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${userState.userData.token}`
                },
                body: JSON.stringify(
                    {
                        "data": {
                            "attributes": {
                                "user_id": idUser,
                                "community_id": idCommunity,
                                "title": title,
                                "description": description,
                                "country": countryName,
                                "flag": countryFlag,
                                "language": language,
                                "timezone": timezone,
                                "game_id": idGame,
                                "game_name": game,
                                "game_image": image
                            }
                        }
                    }
                )
            };
            //fetch
            setButtonLoadingEditCommunity(true)
            updateCommunity(requestOptions)
                .then(response => {
                    setButtonLoadingEditCommunity(false)
                    if (user_role == 'user') {
                        navigateTo(`/community/${community_id}`);
                    }
                })
                .catch(error => {
                    console.error('Error al actualizar la comunidad:', error);
                });
        }
        event.preventDefault();
    };

    return (
        <>
            <Delete community_id={community_id} openDelete={openDelete} setOpenDelete={setOpenDelete} />
            <div className="relative flex justify-center lg:w-4/6 w-full mx-auto border border-main rounded  mb-10">
                {loadingEditCommunity ? (
                    <div className="w-full text-center mx-auto text-main overflow-hidden pt-28 pb-24">
                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                        </div>
                    </div>
                ) : (
                    <form className="lg:w-4/6 sm:w-full mx-auto my-10 font-bold-600 text-left py-8">
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
                        <div className="autocomplete relative z-0 my-10 group lg:w-1/2">
                            <label className="block text-white text-sm font-bold mb-2" htmlFor="game">
                                Game
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-neutral-900 focus:border-main" id="game" type="text" placeholder="Search game" value={game} onChange={(e) => changeGame(e.target.value)} onFocus={() => setIsOpen(true)} onClick={(e) => changeGame(e.target.value)} autoComplete="off" />
                            {
                                isOpen && gameSearch && (
                                    <div className='bg-neutral-900 rounded-lg shadow-lg z-50 w-full bg-neutral-900 h-60 overflow-auto'>
                                        <ul key="ul" className='ml-2 bg-neutral-900'>
                                            {gameSearch.map((game, index) => (
                                                <li className='cursor-pointer hover:bg-gray-500 flex items-center justify-between pl-2 py-1' key={index} onClick={() => gameSelected(game)}>
                                                    <span className="inline-block text-white">{game.name}</span>
                                                    {/* <img src={game.background_image} alt={game.name} className="w-8 h-8 mr-2 inline-block mr-12 rounded-full object-cover object-center" /> */}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )
                            }
                            <small className="text-red-400">{errors.gameErrorText}</small>
                        </div>
                        {/* /Country */}
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
                                <option key="countryDefault" value={country}>

                                    {country && JSON.parse(country).country}
                                </option>
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
                        {/* {userState.userData.role === 'admin' && (
                            <div className="text-center mt-12">
                                <Link to={`/commentslist/${idCommunity}/${idUser}`} className="text-white bg-indigo-600 font-bold hover:bg-indigo-900 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-5/6 px-5 py-2.5 text-center bg-main hover:bg-violet-700 focus:ring-violet-900">
                                    View Comments
                                </Link>
                            </div>
                        )} */}
                        <div className="text-center mt-12">
                            <button className="text-white bg-main font-bold hover:bg-transparent focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-4/6 px-5 py-2.5 text-center bg-main hover:bg-transparent border border-main focus:ring-violet-900" onClick={handleSubmit}>
                                {loadingButtonEditCommunity ? (
                                    <div className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status"></div>
                                ) : (
                                    'Save changes'
                                )}
                            </button>
                        </div>
                        <div className="text-center mt-12">
                            <button className="text-white bg-transparent border border-main font-bold hover:bg-red-600 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-4/6 px-5 py-2.5 text-center focus:ring-violet-900" onClick={(e) => { e.preventDefault(); setOpenDelete(true); }}

                            >Delete community</button>
                        </div>
                        {/* <div className="flex items-center justify-center mt-10">
                        <button className="font-bold text-main text-sm hover:text-purple-600" href="#">Having problems create community?</button>
                    </div> */}
                    </form>
                )}
            </div>
        </>
    )
}

export default EditCommunityForm;