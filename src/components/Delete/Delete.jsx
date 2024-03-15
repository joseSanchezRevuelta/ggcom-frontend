import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react"
import { useSelector } from "react-redux";
import { deleteCommunity } from "../../features/communities/communityRepository";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function Delete({ community_id, openDelete, setOpenDelete }) {

    const userState = useSelector(state => state.user)

    const navigateTo = useNavigate();

    function handleDelete(user_id, community_id) {
        deleteCommunity(user_id, community_id)
        if (userState.userData.role == 'admin') {
            navigateTo('/communitieslist')
        } else {
            navigateTo('/explore')
        }
    }

    return (
        <Transition.Root show={openDelete} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={() => setOpenDelete(false)}>
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
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-[linear-gradient(to_top,rgba(0,0,0),transparent),url('/img/background_modal.jpg')] bg-cover bg-no-repeat bg-center bg-neutral-900 text-left shadow-xl transition-all sm:my-8 w-full sm:w-full max-md:max-w-lg max-lg:max-w-lg lg:max-w-lg xl:max-w-lg 2xl:max-w-lg">
                                <div className="text-center py-8">
                                    <div className="p-4 flex items-center justify-center">
                                        <span className="text-red-600 font-bold">Delete community</span>
                                    </div>
                                    <div className="p-2- flex items-center justify-center">
                                        <span className="text-white">You will lose all the comments and people</span>
                                    </div>
                                    <div className="p-2 flex items-center justify-center">
                                        <span className="text-white">This option is irreversible</span>
                                    </div>
                                    <div className="text-center mt-4 pb-8">
                                        <button className="bg-red-600 hover:bg-red-700 border border-transparent hover:border-main text-white font-bold py-2 px-4 rounded mx-2" onClick={() => handleDelete(userState.userData.token, community_id)}>
                                            Delete
                                        </button>
                                        <button className="bg-transparent hover:bg-main border border-main hover:border-main text-white font-bold py-2 px-4 rounded mx-2" onClick={() => setOpenDelete(false)}>
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default Delete