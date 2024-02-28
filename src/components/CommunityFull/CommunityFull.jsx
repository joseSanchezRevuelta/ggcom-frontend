import { useEffect, useState } from 'react';
import './CommunityFull.css';

function CommunityFull(community_id) {
    const apiUrl = import.meta.env.VITE_URL;

    const [communityData, setCommunityData] = useState(null);
    const [styleBackground, setStyleBackground] = useState(null)

    useEffect(() => {
        // Realizar la consulta a la API utilizando el 'id'
        const fetchData = async () => {
            try {
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
                    const response = await fetch(`${apiUrl}/community?community_id=${community_id.id}`, requestOptions);
                const data = await response.json();
                console.log(data)
                setCommunityData(data);
                setStyleBackground({ backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 1), transparent), url("${data.game_image}")` });
                // const gameNames = data.results.map(result => result.name)
                // setCommunityData(gameNames);
            } catch (error) {
                console.error('Error al obtener datos de la API', error);
            }
        };

        // Llamar a la función de consulta
        fetchData();
    }, [community_id.id]); // Asegúrate de incluir 'id' como dependencia para que la consulta se realice cuando 'id' cambie


    return (
        <>
            {communityData ? (
                <div className='text-center w-4/6 mx-auto rounded-xl pt-28 pb-16'>
                    <div className={`img_title w-full rounded-t-xl overflow-hidden bg-cover bg-no-repeat bg-center`} style={styleBackground}>
                        {/* Contenido de tu componente */}
                    </div>
                    <div>

                    </div>
                    <div className='title text-white h-60'>
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
                        <button className="bg-main hover:bg-main2 text-white font-bold py-2 px-4 rounded">
                            Join to Community
                        </button>
                    </div>

                </div>
            ) : (
                <h1 className='mt-40 text-white'>Cargando datos...</h1>
            )}
        </>
    )
}

export default CommunityFull;