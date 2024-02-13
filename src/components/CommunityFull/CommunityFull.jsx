import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './CommunityFull.css';

function CommunityFull() {

    const { id } = useParams();

    const [communityData, setCommunityData] = useState(null);
    const [styleBackground, setStyleBackground] = useState(null)

    useEffect(() => {
        // Realizar la consulta a la API utilizando el 'id'
        const fetchData = async () => {
            try {
                // const response = await fetch(`https://api.rawg.io/api/games?search=&key=93fea5c3b3a8428f887fdc7ff376251a`);
                const response = await fetch(`https://api.rawg.io/api/games/${id}?key=93fea5c3b3a8428f887fdc7ff376251a`);
                const data = await response.json();
                setCommunityData(data);
                setStyleBackground({ backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 1), transparent), url("${data.background_image}")` });
                // const gameNames = data.results.map(result => result.name)
                // setCommunityData(gameNames);
            } catch (error) {
                console.error('Error al obtener datos de la API', error);
            }
        };

        // Llamar a la función de consulta
        fetchData();
    }, [id]); // Asegúrate de incluir 'id' como dependencia para que la consulta se realice cuando 'id' cambie


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
                        <p>{id}</p>
                        <h2>{communityData.background_image}</h2>
                        <h2>Videogame:</h2>
                        <h2>Numero de comentarios:</h2>
                        <h2>Pais Lengüaje:</h2>
                        <h2>Número de personas:</h2>
                        <button className="bg-main hover:bg-main2 text-white font-bold py-2 px-4 rounded">
                            Join to Community
                        </button>
                    </div>
                    <div className='title text-white rounded-b-xl h-60'>
                        <h1>AQUí los comentarios y el input textarea para comentar</h1>
                    </div>

                </div>
            ) : (
                <h1 className='mt-40 text-white'>Cargando datos...</h1>
            )}
        </>
    )
}

export default CommunityFull;