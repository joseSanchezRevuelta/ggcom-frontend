import { UserCircleIcon } from "@heroicons/react/20/solid"
import { useEffect } from "react";
import { getComments } from "../../features/comments/commentRepository";
import { useState } from "react";
import CommentDrop from '../CommentDrop/CommentDrop';
import InfiniteScroll from "react-infinite-scroll-component";



// eslint-disable-next-line react/prop-types
function Comments({ token, community_id, user_id, user_role, renderComments, setRenderComments, page, setPage }) {
    const [comments, setComments] = useState('')
    const [commentsCheck, setCommentsCheck] = useState(false)
    const [hasMore, setHasMore] = useState(true);
    const limit = 1000;

    useEffect(() => {
        fetchData()
    }, [community_id, renderComments])

    const fetchData = async () => {
        getComments(token, community_id, user_id, page, limit)
            .then(data => {
                if (data.length > 0) {
                    setCommentsCheck(true)
                    if (page == 0) {
                        setComments(data)
                        // setPage(prevPage => prevPage + 1);
                    } else {
                        setComments(prevComments => [...prevComments, ...data]);
                        // setPage(prevPage => prevPage + 1);
                    }
                } else {
                    setComments('')
                    setCommentsCheck(true)
                    // setHasMore(false);
                }

            })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
            })
    }

    return (
        <>
            <div className="relative flex justify-center lg:w-full w-full mx-auto border border-main rounded flex flex-col text-center bg-neutral-950">
                {/* <InfiniteScroll
                    dataLength={comments.length}
                    next={fetchData}
                    hasMore={hasMore}
                loader={
                    <div className="overflow-hidden">
                        <div className="w-full text-center mx-auto text-main">
                            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                                <span className="hidden">Loading...</span>
                            </div>
                        </div>
                    </div>
                }
                // endMessage={<p>No hay más comunidades para cargar.</p>}
                > */}
                {commentsCheck ? (
                    comments.length > 0 ? (
                        <>
                            {comments.map(comment => (
                                <div key={comment.id} className="p-4 text-center text-white w:11/12 lg:w-5/6 mx-auto border border-main rounded my-2 lg:my-4 bg-neutral-950">
                                    <div className="flex flex-row items-center mb-3 justify-between">
                                        <div className="flex flex-row items-center">
                                            <UserCircleIcon className="block h-8 w-8 text-main" aria-hidden="true" />
                                            <span className="ml-1">{comment.username}</span>
                                        </div>
                                        <div className="flex flex-row">
                                            {/* <span className="">{comment.created_at.slice(0, 10) + " " + comment.created_at.slice(11, 16)}</span> */}
                                            <span className="">{comment.created_at.slice(0, 10)}</span>
                                            {
                                                (comment.user_id === user_id || user_role === 'admin') && (
                                                    <div>
                                                        <CommentDrop comment_id={comment.id} comment_user_id={comment.user_id} community_id={comment.community_id} setRenderComments={setRenderComments} setPage={setPage} />
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
                        <div className="py-12">
                            <h1 className='text-white'>No hay comentarios en esta comunidad</h1>
                        </div>
                    )
                ) : (
                    // <h1 className='text-white'>Cargando comentarios...</h1>
                    <div className="w-full text-center mx-auto text-main overflow-hidden py-12">
                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                            {/* <span className="text-white">{communities.communities}</span> */}
                        </div>
                    </div>
                )}
                {/* </InfiniteScroll> */}
            </div>
        </>
    )
}

export default Comments