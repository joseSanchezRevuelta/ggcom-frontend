import { UserCircleIcon } from "@heroicons/react/20/solid"
import { useEffect } from "react";
import { getComments } from "../../features/Comments/commentRepository";
import { useState } from "react";
import CommentDrop from '../CommentDrop/CommentDrop';


// eslint-disable-next-line react/prop-types
function Comments({ community_id, user_id, renderComments, setRenderComments }) {
    const [comments, setComments] = useState('')
    // fetch a getComments
    useEffect(() => {
        getComments(community_id)
            .then(data => {
                console.log(data)
                setComments(data)
            })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
            })
            .finally(() => {
                // setLoadingJoinCommunity(false);
                // setLoadingLeaveCommunity(false);
            });
    }, [community_id, renderComments])

    return (
        <>
            <div className="relative flex justify-center lg:w-full w-full mx-auto border border-main rounded flex flex-col text-center">
                {comments ? (
                    <>
                        {comments.map(comment => (
                            <div key={comment.id} className="p-4 text-center text-white w-5/6 mx-auto border border-main rounded my-4">
                                <div className="flex flex-row items-center mb-3 justify-between">
                                    <div className="flex flex-row items-center">
                                        <UserCircleIcon className="block h-8 w-8 text-main" aria-hidden="true" />
                                        <span>{comment.username}</span>
                                    </div>
                                    <div className="flex flex-row items-center">
                                        <span className="">{comment.created_at}</span>
                                        {
                                            comment.user_id === user_id && (
                                                <div>
                                                    <CommentDrop comment_id={comment.id} comment_user_id={comment.user_id} user_id={user_id} setRenderComments={setRenderComments} />
                                                </div>
                                            )
                                        }

                                    </div>
                                </div>
                                <span className="block text-left">
                                    {comment.comment}
                                </span>
                            </div>
                        ))}
                    </>
                ) : (
                    <h1 className='mt-40 text-white'>Cargando comentarios...</h1>
                )}
            </div>
        </>
    )
}

export default Comments