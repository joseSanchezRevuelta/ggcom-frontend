import { useEffect, useRef, useState } from 'react';
import './CreateCommunityForm.css';

function CreateCommunityForm() {
    const [title, setTitle] = useState('')
    const [game, setGame] = useState('')
    const [language, setLanguage] = useState('')

    const titleRef = useRef(null);

    const [countries, setCountries] = useState([]);

    useEffect(() => {

        fetch('https://restcountries.com/v3.1/all')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const countriesData = data.map(country => ({
                    name: country.name.common,
                    flag: country.flags.png
                }));
                countriesData.sort((a, b) => a.name.localeCompare(b.name));
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

    const renderCountryOptions = () => {
        return countries.map(country => (
            <option key={country.name} value={country.name} className='cursor-pointer'>
                {country.name}
            </option>
        ));
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
                            defaultValue={''}
                            placeholder='You can add a description to the community'
                        />
                    </div>
                    <div className="relative z-0 w-full my-10 group">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="game">
                            Game
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline bg-neutral-900 focus:border-main" id="game" type="text" placeholder="Search game" value={game} onChange={(e) => setGame(e.target.value)} />
                    </div>
                    <div className="relative z-0 w-full my-10 group">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="language">
                            Country / Language
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
                            {renderCountryOptions()}
                        </select>
                    </div>
                    <div className="text-center mt-12">
                        <button className="text-white bg-indigo-600 font-bold hover:bg-indigo-900 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  w-5/6 px-5 py-2.5 text-center dark:bg-main dark:hover:bg-violet-700 dark:focus:ring-violet-900">Create Community</button>
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