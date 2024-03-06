import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateCountryCommunity, updateDescriptionCommunity, updateTitleCommunity } from "../../features/communities/communityRepository";

// eslint-disable-next-line react/prop-types
function EditCountryCommunityModal({ openEditCountryCommunityModal, setOpenEditCountryCommunityModal, community_country, community_id, setCountryState }) {
    const frontUrl = import.meta.env.VITE_URL_FRONT;

    const userState = useSelector(state => state.user)

    const [communityCountry, setCommunityCountry] = useState(community_country)
    const [countries, setCountries] = useState([])
    const [countriesArray, setCountriesArray] = useState([])

    const dispatch = useDispatch();

    const navigateTo = useNavigate();

    useEffect(() => {
        setCommunityCountry(community_country);
    }, [community_country]);

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
            //     <option key={country} value={country} className='cursor-pointer'>
            //     {country}
            // </option>
            <option key={country.country} value={country.country} className='cursor-pointer'>
                {country.country}
            </option>
        )) : null;
    };

    function handleUpdateCountryComunity(token, community_id, community_description) {
        updateCountryCommunity(token, community_id, community_description)
        setOpenEditCountryCommunityModal(false)
        setCountryState(community_description)
        setCommunityCountry('')
    }

    return (
        <Transition.Root show={openEditCountryCommunityModal} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={() => setOpenEditCountryCommunityModal(false)}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 w-screen overflow-y-auto z-50">
                    <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-[linear-gradient(to_top,rgba(0,0,0),transparent),url('/img/signin.jpeg')] bg-cover bg-no-repeat bg-center bg-neutral-900 text-left shadow-xl transition-all sm:my-8 w-full sm:w-full max-md:max-w-lg max-lg:max-w-lg lg:max-w-lg xl:max-w-lg 2xl:max-w-lg text-center">
                                <span className="text-white">Edit Country</span>
                                <select
                                    id="Country"
                                    name="country"
                                    autoComplete="country-name"
                                    placeholder="Country"
                                    className="w-full rounded-md py-2 px-1 bg-neutral-900 text-white shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-main lg:max-w-xs w-full text-md sm:leading-6 rounded-md cursor-pointer"
                                    value={communityCountry}
                                    onChange={(e) => setCommunityCountry(e.target.value)}
                                >
                                    <option value="">{communityCountry}</option>
                                    <option key="international" value={JSON.stringify({ "country": "international", "flag": "/img/world.png" })} className='cursor-pointer'>
                                        International
                                    </option>
                                    {renderCountryOptions()}
                                </select>
                                {/* <small className="text-red-400">{errors.titleErrorText}</small> */}
                                <div className="text-center py-8">
                                    <button className="bg-red-500 hover:bg-transparent border border-transparent hover:border-main text-white font-bold py-2 px-4 rounded mx-2" onClick={() => setOpenEditCountryCommunityModal(false)}>
                                        Cancel
                                    </button>
                                    <button className="bg-main hover:bg-transparent border border-transparent hover:border-main text-white font-bold py-2 px-4 rounded mx-2" onClick={() => handleUpdateCountryComunity(userState.userData.token, community_id, communityCountry)}>
                                        Edit
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default EditCountryCommunityModal