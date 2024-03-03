/* eslint-disable react/prop-types */
import { ChatBubbleOvalLeftEllipsisIcon, UserGroupIcon, FlagIcon } from '@heroicons/react/24/outline'
import './CommunitySimple.css';
import CommunityImage from '../CommunityImage/CommunityImage';

function CommunitySimple({ community }) {
    const imageUrl = community.game_image; // Reemplaza con la URL de tu imagen
    const maxWidth = 960; // Cambia esto al ancho deseado en píxeles
    return (
        <>
            <a href={`/community/${community.id}`}>
                <div className="communitySimple rounded-lg overflow-hidden shadow-lg bg-neutral-900 mb-2 text-white cursor-pointer hover:scale-105 font-medium md:text-sm">
                    {/* <img className="w-full h-56" src={`${community.game_image}`} alt="Sunset in the mountains" /> */}
                    <CommunityImage
                                    imageUrl={imageUrl}
                                    maxWidth={maxWidth}
                                    alt="game_image"
                                    ke={community.id}
                                    className="w-full h-56"
                                />
                    {/* <div className='px-6 pt-4'>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Videojuego</span>
                </div> */}
                    <div className='community_data'>


                        <div className='px-6 pb-4 pt-4'>
                            <a href='#' className='flex items-center hover:text-lg hover:scale-105'>
                                <img
                                    key={community.id}
                                    className="h-8 w-8 rounded-full object-cover object-center"
                                    src={`${community.game_image}`}
                                    alt="game_image"
                                    // onError={(e) => { // Maneja el evento de error para intentar recargar la imagen
                                    //     e.target.src = `${community.game_image}?${new Date().getTime()}`; // Agrega una marca de tiempo para evitar la caché
                                    // }}
                                />
                                <span className='ml-1'>{community.game_name}</span>
                                {/* <span className='ml-1 hover:w-44'>{community.game_name}</span> */}
                            </a>
                        </div>

                        <div className="name_community px-6 pb-4 flex items-center">
                            <div className="font-bold text-xl mb-1">{community.title}</div>
                        </div>
                        <div className="data px-6 pb-2 mb-1 flex justify-between">
                            <div className='flex items-center'>
                                <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6 text-main inline-block" /><span className='ml-1'>{community.num_comments}</span>
                            </div>
                            <div className='flex items-center'>
                                {/* <FlagIcon className="h-6 w-6 text-violet-600 inline-block" /><span className='ml-1'> */}
                                {/* {language} */}
                                <img
                                    src="/img/world.png"
                                    srcSet="https://flagcdn.com/w40/ua.png 2x"
                                    width="20"
                                    alt="Ucrania" />
                                {/* </span> */}
                            </div>
                            <div className='flex items-center'>
                                <UserGroupIcon className="h-6 w-6 text-main inline-block" /><span className='ml-1'>{community.num_persons}</span>
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
            </a>
        </>
    )
}

export default CommunitySimple;