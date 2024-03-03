import Title from '../../components/Title/Title.jsx'
import Filter from '../../components/Filter/Filter.jsx'
import Communities from '../../components/Communities/Communities.jsx'
import { useState, useEffect } from 'react';
import Search from '../../components/Search/Search.jsx';

function Explore() {
    useEffect(() => {
        window.scrollTo(0, 0); // Mueve el scroll al inicio de la página
    }, []);

    const [communities, setCommunities] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/communities`);
                const data = await response.json();
                setCommunities(data)
                // setCommunityData(data);
                // setStyleBackground({ backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 1), transparent), url("${data.background_image}")` });
                // const gameNames = data.results.map(result => result.name)
                // setCommunityData(gameNames);
            } catch (error) {
                console.error('Error al obtener datos de la API', error);
            }
        };
        fetchData()
    }, [])
    return (
        <>
            {/* <div className='bg-neutral-950 bg-cover bg-no-repeat bg-center bg-fixed bg-[url("../../public/img/wallpaper.jpg")]'> */}
            <div className='bg-neutral-950 min-h-screen'>
                <Title title={'EXPLORE COMMUNITIES'} subtitle='EXPLORE THE VIDEOGAME COMMUNITIES' />
                <Search />
                <Filter />
                {!communities ? (
                    <div className="w-full text-center mx-auto text-main">
                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                            <span className="hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <Communities communities={communities} />
                )}
            </div>
        </>
    );
}

export default Explore;