import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateDescriptionCommunity, updateTitleCommunity } from "../../features/communities/communityRepository";

// eslint-disable-next-line react/prop-types
function EditDescriptionCommunityModal({ openEditDescriptionCommunityModal, setOpenEditDescriptionCommunityModal, community_description, community_id, setDescriptionState }) {
    const frontUrl = import.meta.env.VITE_URL_FRONT;

    const userState = useSelector(state => state.user)

    const [communityDescription, setCommunityDescription] = useState(community_description)
    

    const dispatch = useDispatch();

    const navigateTo = useNavigate();

    function handleUpdateTitleComunity(token, community_id, community_description) {
        updateDescriptionCommunity(token, community_id, community_description)
        setOpenEditDescriptionCommunityModal(false)
        setDescriptionState(community_description)
        setCommunityDescription(communityDescription)
    }

    useEffect(() => {
        // Actualiza communityTitle cuando community_descriptin cambie
        setCommunityDescription(community_description);
    }, [community_description]);

    return (
        <Transition.Root show={openEditDescriptionCommunityModal} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={() => setOpenEditDescriptionCommunityModal(false)}>
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
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-[linear-gradient(to_top,rgba(0,0,0),transparent),url('/img/background_modal.jpg')] bg-cover bg-no-repeat bg-center bg-neutral-900 text-left shadow-xl transition-all sm:my-8 w-full sm:w-full max-md:max-w-lg max-lg:max-w-lg lg:max-w-lg xl:max-w-lg 2xl:max-w-lg text-center">
                                <span className="text-white">Edit Description</span>
                                <textarea className="shadow border rounded w-5/6 py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-neutral-900 focus:border-main my-2 mx-auto" id="title" type="text" placeholder="Description Community" value={communityDescription} onChange={(e) => setCommunityDescription(e.target.value)} />
                                {/* <small className="text-red-400">{errors.titleErrorText}</small> */}
                                <div className="text-center py-8">
                                    <button className="bg-red-500 hover:bg-transparent border border-transparent hover:border-main text-white font-bold py-2 px-4 rounded mx-2" onClick={() => setOpenEditDescriptionCommunityModal(false)}>
                                        Cancel
                                    </button>
                                    <button className="bg-main hover:bg-transparent border border-transparent hover:border-main text-white font-bold py-2 px-4 rounded mx-2" onClick={() => handleUpdateTitleComunity(userState.userData.token, community_id, communityDescription)}>
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

export default EditDescriptionCommunityModal