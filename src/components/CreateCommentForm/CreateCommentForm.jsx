import { useState } from "react"
import { createComent } from "../../features/comments/commentRepository"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

// eslint-disable-next-line react/prop-types
function CreateComment({ community_id, joinCommunityData, setRenderComments, setPage, user_role }) {
    const userState = useSelector(state => state.user)
    const [comment, setComment] = useState('')
    const [errorComent, setErrorComment] = useState('')
    const [loadingCreateComment, setLoadingCreateComment] = useState(false);

    function handleComment() {
        let errorComment = 0
        let errorJoin = 0
        // eslint-disable-next-line react/prop-types
        if (joinCommunityData.length === 0) {
            if (user_role != 'admin') {
                setErrorComment('Debes unirte a la comunidad para poder comentar')
                errorJoin++
            }
        } else if (!userState.userData.token) {
            setErrorComment('Debes loguearte para poder comentar')
            errorJoin++
        } else if (comment === '') {
            errorComment++
            setErrorComment('El comentario no puede estar vacio')
        } else if (comment.length > 200) {
            errorComment++
            setErrorComment('Comment is too long (max 200)')
        } else {
            errorComment = 0
            errorJoin = 0
            setErrorComment('')
        }
        if (errorComment === 0 && errorJoin === 0) {
            setLoadingCreateComment(true)
            createComent(userState.userData.token, userState.userData.id, community_id, userState.userData.username, comment)
                .then(() => {
                    // setPage(0)
                    setRenderComments(prevState => !prevState);
                })
                .catch(error => {
                    console.error('Error al abandonar la comunidad:', error);
                })
                .finally(() => {
                    setComment('')
                    setLoadingCreateComment(false)
                });
        }
    }

    return (
        <>
            <div className="relative flex justify-center lg:w-full w-full mx-auto border border-main rounded bg-neutral-950">
                <div className="lg:w-5/6 w-11/12 mx-auto font-bold-600 text-left my-14">
                    <div className="relative z-0 w-full mt-4 mb-10 group">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="description">
                            Add comment
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            rows={3}
                            className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6 bg-neutral-900 p-3"
                            placeholder='You can add a comment to the community'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        // value={description}
                        // onChange={(e) => setDescription(e.target.value)}
                        />
                        <small className="text-red-400">{errorComent}</small>
                    </div>
                    <div className="text-center mt-12">
                        <button className="text-white bg-indigo-600 font-bold hover:bg-transparent focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-5/6 px-5 py-2.5 text-center bg-main hover:bg-transparent border border-main focus:ring-violet-900"
                            onClick={handleComment}
                            disabled={loadingCreateComment}>
                            {loadingCreateComment ? (
                                <div className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status"></div>
                            ) : (
                                'Comment'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateComment