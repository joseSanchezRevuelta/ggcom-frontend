import { Fragment, useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import Delete from '../Delete/Delete'
import DeleteComment from '../DeleteComment/DeleteComment'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

// eslint-disable-next-line react/prop-types
export default function CommentDrop({comment_id, comment_user_id, community_id, setRenderComments,setPage}) {
    const [openDeleteComment, setOpenDeleteComment] = useState(false);

    useEffect(() => {
        if (openDeleteComment) {
            document.body.style.overflow = 'hidden'; // Deshabilita el desplazamiento
        } else {
            document.body.style.overflow = 'auto'; // Habilita el desplazamiento
        }
        return () => {
            document.body.style.overflow = 'auto'; // Asegúrate de restablecer el desplazamiento cuando se desmonte el modal
        };
    }, [openDeleteComment]);

    return (
        <>
            <DeleteComment comment_id={comment_id} comment_user_id={comment_user_id} community_id={community_id} openDeleteComment={openDeleteComment} setOpenDeleteComment={setOpenDeleteComment} setRenderComments={setRenderComments} setPage={setPage}/>

            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white pl-3 py-2 text-sm font-semibold text-gray-900 shadow-sm bg-opacity-0">
                        <EllipsisVerticalIcon className='h-6 w-6 text-main inline-block' />
                    </Menu.Button>
                </div>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 z-10 w-56 origin-top-right rounded-md bg-neutral-900 border border-main shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-white">
                        <div className="py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        href="#"
                                        className={classNames(
                                            active ? 'bg-neutral-900 text-white hover:text-main' : 'text-white',
                                            'block px-4 py-2 text-sm'
                                        )}
                                        onClick={(e) => { e.preventDefault(); setOpenDeleteComment(true); }}
                                    >
                                        Delete Comment
                                    </a>
                                )}
                            </Menu.Item>
                            {/* <form method="POST" action="#">
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            type="submit"
                                            className={classNames(
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'block w-full px-4 py-2 text-left text-sm'
                                            )}
                                        >
                                            Sign out
                                        </button>
                                    )}
                                </Menu.Item>
                            </form> */}
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </>
    )
}
