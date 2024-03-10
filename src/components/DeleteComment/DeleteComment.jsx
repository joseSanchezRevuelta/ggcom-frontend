import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react"
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../features/users/usersRepository";
import { clearUserData } from "../../features/users/usersSlice";
import { deleteCommentRepository } from "../../features/Comments/commentRepository";

// eslint-disable-next-line react/prop-types
function DeleteComment({ comment_id, comment_user_id, community_id, openDeleteComment, setOpenDeleteComment, setRenderComments, setPage }) {
    const userState = useSelector(state => state.user)

    function handleDelete(token, comment_user_id, community_id, comment_id) {
        console.log('delete comment')
        deleteCommentRepository(token, comment_user_id, community_id, comment_id)
            .then(() => {
                // setPage(0)
                setOpenDeleteComment(false)
                setRenderComments(prevState => !prevState);
            })
            .catch(error => {
                console.error('Error al corrar el comment:', error);
            })
            .finally(() => {
                // setLoadingCreateComment(false)
            });
    }

    return (
        <Transition.Root show={openDeleteComment} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={() => setOpenDeleteComment(false)}>
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
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-[linear-gradient(to_top,rgba(0,0,0),transparent),url('/img/signin.jpeg')] bg-cover bg-no-repeat bg-center bg-neutral-900 text-left shadow-xl transition-all sm:my-8 w-full sm:w-full max-md:max-w-lg max-lg:max-w-lg lg:max-w-lg xl:max-w-lg 2xl:max-w-lg">
                                <div className="text-center py-8">
                                    <button className="bg-main hover:bg-transparent border border-transparent hover:border-main text-white font-bold py-2 px-4 rounded mx-2" onClick={() => handleDelete(userState.userData.token, comment_user_id, community_id, comment_id)}>
                                        Delete
                                    </button>
                                    <button className="bg-red-500 hover:bg-transparent border border-transparent hover:border-main text-white font-bold py-2 px-4 rounded mx-2" onClick={() => setOpenDeleteComment(false)}>
                                        Cancel
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

export default DeleteComment