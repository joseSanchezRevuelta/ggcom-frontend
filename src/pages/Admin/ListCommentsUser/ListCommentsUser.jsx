import { useEffect, useState } from 'react';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getComments } from '../../features/comments/commentRepository';
import CommentDrop from '../../components/CommentDrop/CommentDrop';

// eslint-disable-next-line react/prop-types
function ListCommentsUser({ token, communityid, userid }) {

    const [comments, setComments] = useState([])
    const [renderComments, setRenderComments] = useState(false)
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const limit = 24;

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchData()
    }, []);

    const fetchData = async () => {
        try {
            getComments(token, communityid, userid, page, limit)
                .then(response => {
                    if (response.length > 0) {
                        if (page == 0) {
                            setComments(response)
                            setPage(prevPage => prevPage + 1);
                        } else {
                            setComments(prevCommunities => [...prevCommunities, ...response]);
                            setPage(prevPage => prevPage + 1);
                        }
                    } else {
                        setComments(response)
                        setHasMore(false);
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        } catch (error) {
            console.error('Error al obtener datos de la API', error);
        }
    }

    return (
        <>
            <div className="relative flex justify-center lg:w-full w-full mx-auto border border-main rounded flex flex-col text-center">
                <InfiniteScroll
                    dataLength={comments.length}
                    next={fetchData}
                    hasMore={hasMore}
                >
                    {comments ? (
                        comments.length > 0 ? (
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
                                                    <div>
                                                        <CommentDrop comment_id={comment.id} comment_user_id={comment.user_id} community_id={comment.community_id} setRenderComments={setRenderComments} />
                                                    </div>
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
                            <h1 className='text-white'>No hay comentarios en esta comunidad</h1>
                        )
                    ) : (
                        <h1 className='text-white'>Cargando comentarios...</h1>
                    )}
                </InfiniteScroll>
            </div>
        </>
    )
}

export default ListCommentsUser;