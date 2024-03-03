import { useState } from "react"
import { createComent } from "../../features/Comments/commentRepository"
import { useSelector } from "react-redux"

// eslint-disable-next-line react/prop-types
function CreateComment({ community_id, joinCommunityData, setRenderComments }) {
    const userState = useSelector(state => state.user)
    const [comment, setComment] = useState('')
    const [errorComent, setErrorComment] = useState('')
    const [loadingCreateComment, setLoadingCreateComment] = useState(false);
    
    function handleComment() {
        let errorComment = 0
        let errorJoin = 0
        // eslint-disable-next-line react/prop-types
        if (joinCommunityData.length === 0) {
            setErrorComment('Debes unirte a la comunidad para poder comentar')
            errorJoin++
        } else if (comment === '') {
            errorComment++
            setErrorComment('El comentario no puede estar vacio')
        } else {
            errorComment = 0
            errorJoin = 0
            setErrorComment('')
        }
        if (errorComment === 0 && errorJoin === 0) {
            setLoadingCreateComment(true)
            createComent(userState.userData.token, userState.userData.id, community_id, userState.userData.username, comment)
                .then(() => {
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
            <div className="relative flex justify-center lg:w-full w-full mx-auto border border-main rounded">
                <div className="lg:w-5/6 sm:w-full mx-auto my-10 font-bold-600 text-left py-8">
                    <div className="relative z-0 w-full my-10 group">
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
                        <button className="text-white bg-indigo-600 font-bold hover:bg-indigo-900 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  w-5/6 px-5 py-2.5 text-center dark:bg-main dark:hover:bg-violet-700 dark:focus:ring-violet-900"
                            onClick={handleComment}
                            disabled={loadingCreateComment}>
                            {loadingCreateComment ? 'Loading...' : 'Comment'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateComment