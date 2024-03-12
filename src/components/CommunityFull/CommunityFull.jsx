import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getCommunity } from '../../features/communities/communityRepository';
import { createJoinCommunity, getJoinCommunity, leaveCommunity } from '../../features/joinCommunitiesRepository/joinCommunityRepository';
import CommunityDrop from '../CommunityDrop/CommunityDrop';
import CreateCommentForm from '../CreateCommentForm/CreateCommentForm';
import './CommunityFull.css';
import Comments from '../Comments/Comments';
import Footer from '../Footer/Footer';
import { ChatBubbleOvalLeftEllipsisIcon, UserGroupIcon, ClockIcon, LanguageIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import ForgotPassword from '../ForgotPassword/ForgotPassword';

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

    const [openSignIn, setOpenSignIn] = useState(false);
    const [openSignUp, setOpenSignUp] = useState(false);
    const [openForgotPassword, setOpenForgotPassword] = useState(false);

    console.log(userState)

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
        createJoinCommunity(userState.userData.token, userState.userData.id, community_id.id, community_id.user_id)
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
            <SignIn openSignIn={openSignIn} setOpenSignIn={setOpenSignIn} openSignUp={openSignUp} setOpenSignUp={setOpenSignUp} setOpenForgotPassword={setOpenForgotPassword} />
            <SignUp openSignUp={openSignUp} setOpenSignUp={setOpenSignUp} openSignIn={openSignIn} setOpenSignIn={setOpenSignIn} />
            <ForgotPassword openForgotPassword={openForgotPassword} setOpenForgotPassword={setOpenForgotPassword} setOpenSignIn={setOpenSignIn} />
            {communityData ? (
                <div className='min-h-screen text-center w-full lg:w-4/6 mx-auto rounded-xl mt-20 lg:mt-0 lg:pt-28 pb-16'>
                    {/* IMG */}
                    <div className="relative w-full">
                        <div className={`img_title lg:w-full rounded-t-xl overflow-hidden bg-cover bg-no-repeat bg-center`} style={styleBackground}>
                        </div>
                        <div href='#' className='flex items-center absolute top-2 left-2 text-white font-bold px-2 py-1'>
                            <span className='ml-2'>{communityData.game_name}</span>
                        </div>
                    </div>
                    <div className="relative title text-white flex flex-col justify-center items-center space-y-4 text-sm lg:text-base">
                        <div className='flex flex-row justify-between w-full px-2 lg:px-5 py-4'>
                            {/* Language */}
                            <div href='#' className='flex items-center'>
                                {/* <img
                                    className="h-6 ml-1 w-auto hover:border border-transparent"
                                    src="/img/languages.png"
                                    alt="language"
                                /> */}
                                <LanguageIcon className="h-5 w-5 text-main inline-block" />
                                <span className='text-white ml-1'>{communityData.language}</span>
                            </div>
                            <div className='absolute left-1/2 transform -translate-x-1/2 flex flex-row flex items-center'>
                                <div className='flex flex-col lg:flex-row items-center'>
                                    <img
                                        src={communityData.flag}
                                        srcSet="https://flagcdn.com/w40/ua.png 2x"
                                        width="30"
                                        alt="Ucrania" />
                                    <span className='text-white lg:ml-3'>{communityData.country}</span>
                                </div>
                            </div>
                            {/* Timezone */}
                            <div className='flex items-center'>
                                {
                                    communityData.timezone === 'Notspecify' ? (
                                        <span className="mr-1">Not timezone</span>
                                    ) : (
                                        <span className="mr-1">{communityData.timezone}</span>
                                    )
                                }
                                <ClockIcon className="h-5 w-5 text-main inline-block" />
                                {/* <img
                                    className="h-6 ml-1 w-auto hover:border border-transparent"
                                    src="/img/timezone.png"
                                    alt="timezone"
                                /> */}
                            </div>
                        </div>

                        <div className='relative flex flex-row justify-between w-full px-2 lg:px-5 pt-4'>
                            {/* Persons */}
                            <div href='#' className='flex items-center'>
                                <UserGroupIcon className="h-5 w-5 mb-1 text-main inline-block" /><span className='ml-1'>{communityData.num_persons}</span>
                            </div>
                            <div className='absolute inset-x-0 flex justify-center'>
                                {
                                    !userState.userData.token ? (
                                        <button className="bg-main hover:bg-transparent border border-main text-white font-bold py-2 px-4 rounded" onClick={() => setOpenSignIn(true)}>
                                            Login for join
                                        </button>
                                    ) : (
                                        userState.userData.id !== communityData.user_id ? (
                                            <>
                                                {
                                                    joinCommunityData.length ? (
                                                        <button
                                                            className="bg-transparent hover:bg-main border border-main text-white font-bold py-2 w-36 rounded"
                                                            onClick={handleLeaveCommunity}
                                                            disabled={loadingLeaveCommunity}
                                                        >
                                                            {loadingLeaveCommunity ? (
                                                                <div className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status"></div>
                                                            ) : (
                                                                'Leave community'
                                                            )}
                                                        </button>
                                                    ) : (
                                                        <button
                                                            className="bg-main hover:bg-transparent border border-main text-white font-bold py-2 w-36 rounded"
                                                            onClick={handleJoinCommunity}
                                                            disabled={loadingJoinCommunity}
                                                        >
                                                            {loadingJoinCommunity ? (
                                                                <div className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status"></div>
                                                            ) : (
                                                                'Join community'
                                                            )}
                                                        </button>
                                                    )
                                                }
                                            </>
                                        ) : (
                                            <>
                                                <div>
                                                    <Link key={communityData.id} to={`/editcommunity/${communityData.id}`} className='bg-main hover:bg-transparent border border-main text-white font-bold py-2 px-4 rounded'>
                                                        Edit community
                                                    </Link>
                                                </div>
                                            </>
                                        )
                                    )
                                }
                            </div>
                            {/* Comments */}
                            <div href='#' className='flex items-center'>
                                <span className='mr-1'>{communityData.num_comments}</span><ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5 mb-1 text-main inline-block" />
                            </div>
                        </div>
                        {/* Title & Description */}
                        <div className='flex text-center items-center w-5/6 lg:px-5 py-4 lg:py-12 text-xl lg:text-4xl'>
                            <span className='mx-auto'>
                                {communityData.title}
                            </span>
                        </div>
                        {
                            communityData.description !== '' ? (
                                <div className='flex flex-row text-left items-center justify-between w-5/6 lg:pt-6 pb-8 lg:pb-16 lg:px-5 text-sm lg:text-xl'>
                                    <span className=''>
                                        {communityData.description}
                                    </span>
                                </div>
                            ) : null
                        }
                        {/* Form Comment */}
                    </div>
                    {/* Formulario para commentario */}
                    <div className=''>
                        <CreateCommentForm community_id={community_id.id} joinCommunityData={joinCommunityData} setRenderComments={setRenderComments} setPage={setPage} user_role={userState.userData.role} />
                    </div>
                    {/* Comentarios */}
                    <Comments token={userState.userData.token} community_id={community_id.id} user_id={userState.userData.id} user_role={userState.userData.role} renderComments={renderComments} setRenderComments={setRenderComments} page={page} setPage={setPage} />
                </div>
            ) : (
                // <h1 className='mt-40 text-white'>Cargando datos...</h1>
                <div className="w-full text-center mx-auto text-main overflow-hidden pt-40 pb-24">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                    </div>
                </div>
            )}
            <Footer width={'w-full'} />
        </>
    )
}

export default CommunityFull;