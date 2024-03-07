import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getCommunity } from '../../features/communities/communityRepository';
import { createJoinCommunity, getJoinCommunity, leaveCommunity } from '../../features/joinCommunitiesRepository/joinCommunityRepository';
import CommunityDrop from '../CommunityDrop/CommunityDrop';
import CreateCommentForm from '../CreateCommentForm/CreateCommentForm';
import './CommunityFull.css';
import Comments from '../Comments/Comments';

function CommunityFull(community_id) {
    const userState = useSelector(state => state.user)
    const [communityData, setCommunityData] = useState(null);
    const [styleBackground, setStyleBackground] = useState(null);
    const [joinCommunityData, setJoinCommunityData] = useState('')
    const [loadingJoinCommunity, setLoadingJoinCommunity] = useState(false);
    const [loadingLeaveCommunity, setLoadingLeaveCommunity] = useState(false);
    const [renderData, setRenderData] = useState(false)
    const [renderComments, setRenderComments] = useState(false)
    const [page, setPage] = useState(0);

    useEffect(() => {
        console.log('El estado de renderComments ha cambiado:', renderComments);
    }, [renderComments]);
    

    // fetch a comunidad
    useEffect(() => {
        getCommunity(community_id.id)
            .then(data => {
                setCommunityData(data);
                setStyleBackground({ backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 1), transparent), url("${data.game_image}")` });
            })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
            });
    }, [community_id.id, renderData]);

    // fetch a joincommunity
    useEffect(() => {
        getJoinCommunity(userState.userData.token, community_id.id)
            .then(data => {
                setJoinCommunityData(data);
            })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
            })
            .finally(() => {
                setLoadingJoinCommunity(false);
                setLoadingLeaveCommunity(false);
            });
    }, [userState.userData.token, community_id.id, renderData])

    // Join community
    function handleJoinCommunity() {
        setLoadingJoinCommunity(true);
        createJoinCommunity(userState.userData.token, userState.userData.id, community_id.id)
            .then(() => {
                setRenderData(prevState => !prevState);
            })
            .catch(error => {
                console.error('Error al unirse a la comunidad:', error);
            })
    }

    //Leave community
    function handleLeaveCommunity() {
        setLoadingLeaveCommunity(true);
        leaveCommunity(userState.userData.token, userState.userData.id, community_id.id)
            .then(() => {
                setRenderData(prevState => !prevState);
            })
            .catch(error => {
                console.error('Error al abandonar la comunidad:', error);
            })
    }

    return (
        <>
            {communityData ? (
                <div className='text-center w-4/6 mx-auto rounded-xl pt-28 pb-16'>
                    {/* IMG */}
                    <div className={`img_title w-full rounded-t-xl overflow-hidden bg-cover bg-no-repeat bg-center`} style={styleBackground}></div>
                    {
                        !userState || (userState.userData.id !== communityData.user_id) ? (
                            <>
                                {
                                    joinCommunityData.length ? (
                                        <button
                                            className="bg-red-500 hover:bg-main2 text-white font-bold py-2 px-4 rounded"
                                            onClick={handleLeaveCommunity}
                                            disabled={loadingLeaveCommunity}
                                        >
                                            {loadingLeaveCommunity ? 'Loading...' : 'Leave community'}
                                        </button>
                                    ) : (
                                        <button
                                            className="bg-main hover:bg-main2 text-white font-bold py-2 px-4 rounded"
                                            onClick={handleJoinCommunity}
                                            disabled={loadingJoinCommunity}
                                        >
                                            {loadingJoinCommunity ? 'Loading...' : 'Join Community'}
                                        </button>
                                    )
                                }
                            </>
                        ) : (
                            <div>
                                <CommunityDrop community_id={community_id.id} />
                            </div>
                        )
                    }
                    <div className="title text-white justify-center items-center space-y-4">
                        <h1>NAME OF COMMUNITY</h1>
                        <p>{communityData.title}</p>
                        <h1>Description:</h1>
                        <p>{communityData.dscription}</p>
                        <h1>Imagen:</h1>
                        <h2>{communityData.game_image}</h2>
                        <h2>Videogame:</h2>
                        <p>{communityData.game_name}</p>
                        <h2>Pais:</h2>
                        <p>{communityData.country}</p>
                        <h2>Lengüaje:</h2>
                        <p>{communityData.language}</p>
                        <h2>Timezone</h2>
                        <p>{communityData.timezone}</p>
                        <h2>Numero de comentarios:</h2>
                        <p>{communityData.num_comments}</p>
                        <h2>Número de personas:</h2>
                        <p>{communityData.num_persons}</p>
                    </div>
                    {/* Formulario para commentario */}
                    <div className=''>
                        <CreateCommentForm community_id={community_id.id} joinCommunityData={joinCommunityData} setRenderComments={setRenderComments} setPage={setPage}/>
                    </div>
                    {/* Comentarios */}
                    <Comments token={userState.userData.token} community_id={community_id.id} user_id={userState.userData.id} renderComments={renderComments} setRenderComments={setRenderComments} page={page} setPage={setPage}/>
                </div>
            ) : (
                <h1 className='mt-40 text-white'>Cargando datos...</h1>
            )}
        </>
    )
}

export default CommunityFull;