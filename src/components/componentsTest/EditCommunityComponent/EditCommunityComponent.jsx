import { useEffect, useState } from "react"
import DeleteUser from '../DeleteUser/DeleteUser.jsx'
import EditUsernameModal from "../EditUsernameModal/EditUsernameModal.jsx"
import EditEmailModal from "../EdirEmailModal/EditEmailModal.jsx"
import EditPasswordlModal from "../EditPasswordModal/EditPasswordModal.jsx"
import EditTitleCommunityModal from "../EditTitleCommunityModal/EditTitleCommunityModal.jsx"
import EditDescriptionCommunityModal from "../EditDescriptionCommunityModal/EditDescriptionCommunityModal.jsx"
import EditCountryCommunityModal from "../EditCountryCommunityModal/EditCountryCommunityModal.jsx"
import EditLanguageCommunityModal from "../EditLanguageCommunityModal/EditLanguageCommunityModal.jsx"
import EditTimezoneCommunityModal from "../EditTimezoneCommunityModal/EditTimezoneCommunityModal.jsx"

// eslint-disable-next-line react/prop-types
export default function EditCommunityComponent({ community_id, title, description, game_name, country, language, timezone }) {
    const [titleState, setTitleState] = useState(title)
    const [descriptionState, setDescriptionState] = useState(description)
    const [countryState, setCountryState] = useState(country)
    const [gameNameState, setGameNameState] = useState(game_name)
    const [languageState, setLanguageState] = useState(language)
    const [timezoneState, setTimezoneState] = useState(timezone)
    const [countries, setCountries] = useState([])

    const [openEditTitleCommunityModal, setOpenEditTitleCommunityModal] = useState(false);
    const [openEditDescriptionCommunityModal, setOpenEditDescriptionCommunityModal] = useState(false);
    const [openEditCountryCommunityModal, setOpenEditCountryCommunityModal] = useState(false);
    const [openEditLanguageCommunityModal, setOpenEditLanguageCommunityModal] = useState(false);
    const [openEditTimezoneCommunityModal, setOpenEditTimezoneCommunityModal] = useState(false);
    // const [openEditPasswordModal, setOpenEditPasswordModal] = useState(false);
    const [openDeleteUser, setOpenDeleteUser] = useState(false);

    useEffect(() => {
        // Actualiza communityTitle cuando community_title cambie
        setTitleState(title);
        setDescriptionState(description)
        setCountryState(country)
        setLanguageState(language)
        setTimezoneState(timezone)
    }, [title, description, country, language, timezone]);
    return (
        <>
            <EditTitleCommunityModal openEditTitleCommunityModal={openEditTitleCommunityModal} setOpenEditTitleCommunityModal={setOpenEditTitleCommunityModal} community_title={titleState} community_id={community_id} setTitleState={setTitleState} />

            <EditDescriptionCommunityModal openEditDescriptionCommunityModal={openEditDescriptionCommunityModal} setOpenEditDescriptionCommunityModal={setOpenEditDescriptionCommunityModal} community_description={descriptionState} community_id={community_id} setDescriptionState={setDescriptionState} />

            <EditCountryCommunityModal openEditCountryCommunityModal={openEditCountryCommunityModal} setOpenEditCountryCommunityModal={setOpenEditCountryCommunityModal} community_id={community_id} community_country={countryState} setCountryState={setCountryState} />

            <EditLanguageCommunityModal openEditLanguageCommunityModal={openEditLanguageCommunityModal} setOpenEditLanguageCommunityModal={setOpenEditLanguageCommunityModal} community_id={community_id} community_language={languageState} setLanguageState={setLanguageState} />

            <EditTimezoneCommunityModal openEditTimezoneCommunityModal={openEditTimezoneCommunityModal} setOpenEditTimezoneCommunityModal={setOpenEditTimezoneCommunityModal} community_id={community_id} community_timezone={timezoneState} setTimezoneState={setTimezoneState} />

            {/* <EditPasswordlModal openEditPasswordModal={openEditPasswordModal} setOpenEditPasswordModal={setOpenEditPasswordModal} passwordState={passwordState} user_id={user_id} /> */}
            {/* <DeleteUser openDeleteUser={openDeleteUser} setOpenDeleteUser={setOpenDeleteUser} user_id={user_id} /> */}

            <div className="relative flex justify-center lg:w-4/6 w-full mx-auto border border-main rounded">
                {/* <form className="lg:w-4/6 sm:w-full mx-auto my-10 font-bold-600 text-left py-8"> */}
                <div className="lg:w-4/6 sm:w-full mx-auto my-10 font-bold-600 text-left py-8">
                    <div className="relative z-0 w-5/6 my-4 group mx-auto items-center justify-center">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="title">
                            Title
                        </label>
                        <div className="w-full text-center flex items-center justify-between">
                            <span className="text-white">{titleState}</span>
                            <button className="text-white bg-indigo-600 font-bold hover:bg-indigo-900 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center bg-main hover:bg-violet-700 focus:ring-violet-900" onClick={() => setOpenEditTitleCommunityModal(true)}>Edit</button>
                        </div>
                        {/* <input className="shadow border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-neutral-900 focus:border-main" id="title" type="text" placeholder="Title Community" value={userNameState} onChange={(e) => setUserNameState(e.target.value)} />
                        <small className="text-red-400">{errors.titleErrorText}</small> */}
                    </div>
                    <hr></hr>
                    <div className="relative z-0 w-5/6 my-4 group mx-auto items-center justify-center">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="title">
                            Description
                        </label>
                        <div className="w-full text-center flex items-center justify-between">
                            {descriptionState === "" ? (
                                <span className="text-white">No description</span>
                            ) : (
                                <span className="text-white">{descriptionState}</span>
                            )}

                            <button className="text-white bg-indigo-600 font-bold hover:bg-indigo-900 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center bg-main hover:bg-violet-700 focus:ring-violet-900" onClick={() => setOpenEditDescriptionCommunityModal(true)}>Edit</button>
                        </div>
                        {/* <input className="shadow border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-neutral-900 focus:border-main" id="title" type="text" placeholder="Title Community" value={userNameState} onChange={(e) => setUserNameState(e.target.value)} />
                        <small className="text-red-400">{errors.titleErrorText}</small> */}
                    </div>
                    <hr></hr>
                    {/* COUNTRY */}
                    <div className="relative z-0 w-5/6 my-4 group mx-auto items-center justify-center">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="title">
                            Country
                        </label>
                        <div className="w-full text-center flex items-center justify-between">
                            <span className="text-white">{countryState}</span>
                            <button className="text-white bg-indigo-600 font-bold hover:bg-indigo-900 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center bg-main hover:bg-violet-700 focus:ring-violet-900" onClick={() => setOpenEditCountryCommunityModal(true)}>Edit</button>
                        </div>
                        {/* <input className="shadow border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-neutral-900 focus:border-main" id="title" type="text" placeholder="Title Community" value={userNameState} onChange={(e) => setUserNameState(e.target.value)} />
                        <small className="text-red-400">{errors.titleErrorText}</small> */}
                    </div>
                    <hr></hr>
                    {/* LANGUAGE */}
                    <div className="relative z-0 w-5/6 my-4 group mx-auto items-center justify-center">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="title">
                            Language
                        </label>
                        <div className="w-full text-center flex items-center justify-between">
                            <span className="text-white">{languageState}</span>
                            <button className="text-white bg-indigo-600 font-bold hover:bg-indigo-900 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center bg-main hover:bg-violet-700 focus:ring-violet-900" onClick={() => setOpenEditLanguageCommunityModal(true)}>Edit</button>
                        </div>
                        {/* <input className="shadow border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-neutral-900 focus:border-main" id="title" type="text" placeholder="Title Community" value={userNameState} onChange={(e) => setUserNameState(e.target.value)} />
                        <small className="text-red-400">{errors.titleErrorText}</small> */}
                    </div>
                    <hr></hr>
                    {/* TIMEXONE */}
                    <div className="relative z-0 w-5/6 my-4 group mx-auto items-center justify-center">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="title">
                            Timezone
                        </label>
                        <div className="w-full text-center flex items-center justify-between">
                            <span className="text-white">{timezoneState}</span>
                            <button className="text-white bg-indigo-600 font-bold hover:bg-indigo-900 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center bg-main hover:bg-violet-700 focus:ring-violet-900" onClick={() => setOpenEditTimezoneCommunityModal(true)}>Edit</button>
                        </div>
                        {/* <input className="shadow border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-neutral-900 focus:border-main" id="title" type="text" placeholder="Title Community" value={userNameState} onChange={(e) => setUserNameState(e.target.value)} />
                        <small className="text-red-400">{errors.titleErrorText}</small> */}
                    </div>
                    {/* <div className="text-center mt-12">
                        <button className="text-white bg-indigo-600 font-bold hover:bg-indigo-900 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-4/6 px-5 py-2.5 text-center bg-main hover:bg-violet-700 focus:ring-violet-900" onClick={() => setOpenEditPasswordModal(true)}>Change password</button>
                    </div>
                    <div className="text-center mt-12">
                        <button className="text-white bg-red-500 font-bold hover:bg-indigo-900 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-4/6 px-5 py-2.5 text-center focus:ring-violet-900" onClick={() => setOpenDeleteUser(true)}>Delete user</button>
                    </div> */}
                </div>
                {/* </form> */}
            </div>
        </>
    )
}