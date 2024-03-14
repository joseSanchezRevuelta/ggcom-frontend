/* eslint-disable react/prop-types */
import { ChatBubbleOvalLeftEllipsisIcon, UserGroupIcon, FlagIcon, LanguageIcon, ClockIcon } from '@heroicons/react/24/outline'
import './CommunitySimple.css';
import CommunityImage from '../CommunityImage/CommunityImage';
import { Link } from 'react-router-dom';

function CommunitySimple({ community }) {
    const imageUrl = community.game_image; // Reemplaza con la URL de tu imagen
    const maxWidth = 960; // Cambia esto al ancho deseado en píxeles
    return (
        <>
            <Link to={`/community/${community.id}`}>
                <div className="communitySimple relative rounded-lg overflow-hidden shadow-lg bg-neutral-950 mb-2 text-white cursor-pointer hover:scale-105 font-medium md:text-sm border border-neutral-600">
                    {/* <img className="w-full h-56" src={`${community.game_image}`} alt="Sunset in the mountains" /> */}
                    <CommunityImage
                        imageUrl={imageUrl}
                        maxWidth={maxWidth}
                        alt="game_image"
                        ke={community.id}
                        className="img_game_simple w-full h-56"
                    />
                    {/* <div className='px-6 pt-4'>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Videojuego</span>
                </div> */}


                    <div href='#' className='flex items-center absolute top-2 left-2 text-white font-bold px-2 py-1'>
                        {/* <img
                            key={community.id}
                            className="h-8 w-8 rounded-full object-cover object-center"
                            src={`${community.game_image}`}
                            alt="game_image"
                        // onError={(e) => { // Maneja el evento de error para intentar recargar la imagen
                        //     e.target.src = `${community.game_image}?${new Date().getTime()}`; // Agrega una marca de tiempo para evitar la caché
                        // }}
                        /> */}
                        <span className='ml-1'>{community.game_name}</span>
                        {/* <span className='ml-1 hover:w-44'>{community.game_name}</span> */}
                    </div>

                    <div className='community_data'>


                        <div className='flex flex-row justify-between w-full px-2 py-4'>
                            {/* People */}
                            <div className='flex items-center'>
                                <UserGroupIcon className="h-5 w-5 mb:0.5 lg:mb-1 text-main inline-block" />
                                <span className='ml-1'>{community.num_persons}</span>
                            </div>
                            {/* Comments */}
                            <div className='flex items-center'>
                                <span className='mr-1'>{community.num_comments}</span>
                                <ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5 mb:0.5 lg:mb-1 text-main inline-block" />
                            </div>
                        </div>

                        <div className="name_community px-6 pb-4 flex items-center text-left">
                            <div className="font-bold text-base mb-1">{community.title}</div>
                        </div>
                        <div className="data flex justify-between w-full px-2 pt-2">
                            {/* Language */}
                        <div className='flex items-center'>
                                {/* <img
                                    className="h-5 ml-1 w-auto"
                                    src="/img/languages.png"
                                    alt="language"
                                /> */}
                                <LanguageIcon className="h-5 w-5 text-main inline-block" />
                                <span className='text-white ml-1'>{community.language}</span>
                            </div>
                            {/* Country */}
                            <div className='flex items-center absolute inset-x-0 flex justify-center'>
                                {/* <FlagIcon className="h-6 w-6 text-violet-600 inline-block" /><span className='ml-1'> */}
                                {/* {language} */}
                                <img
                                    src={community.flag}
                                    srcSet={community.flag}
                                    width="25"
                                    alt="Ucrania" 
                                    // className='border border-neutral-600'
                                    />
                                {/* </span> */}
                            </div>
                            {/* Tiemzone */}
                            <div className='flex items-center'>
                                {
                                    community.timezone === 'Notspecify' ? (
                                        <span className="mr-1">Not timezone</span>
                                    ) : (
                                        <span className="mr-1">{community.timezone}</span>
                                    )
                                }
                                <ClockIcon className="h-5 w-5 text-main inline-block" />
                                {/* <img
                                    className="h-5 ml-1 w-auto hover:border border-transparent"
                                    src="/img/timezone.png"
                                    alt="timezone"
                                /> */}
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className='bg-neutral-900 border-solid border-2 border-sky-500 lg:my-5 md:my-3 cursor-pointer lg:w-80 md:w-60 rounded-s-xl'>
                <div className='w-full border-2 border-red-500'>
                    <img className='h-full object-fill border-2 border-green-500 bg-neutral-900 rounded-s-xl' src="src/public/img/lol.jpg" alt="img" />
                </div>
                <div className='bg-neutral-900 border-solid border-2 border-green-500 h-50 rounded-s-xl mx-4 text-lg'>
                <BeakerIcon className="h-6 w-6 text-white" /><br></br>


                    <span className='text-white'>The Witcher 3 - Wild Hunt  dfg dfg dfg dfg dfg dfg </span>
                </div>
            </div> */}
                {/* <div className='w-full border-solid border-2 border-sky-500 my-2'> */}
                {/* <div className='w-full h-10 border-2 border-red-500'>
                <img className='h-full object-fill border-2 border-green-500' src="https://tailwindui.com/img/logos/mark.svg?color=violet&shade=500" alt="img" />
            </div> */}
                {/* <div>

            </div> */}
                {/* </div> */}
            </Link>
        </>
    )
}

export default CommunitySimple;