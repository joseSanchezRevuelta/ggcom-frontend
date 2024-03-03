import Title from '../../components/Title/Title.jsx'
import Filter from '../../components/Filter/Filter.jsx'
import Communities from '../../components/Communities/Communities.jsx'
import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

function Explore() {
    const [communities, setCommunities] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const limit = 12;

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:8000/communities?page=${page}&limit=${limit}`);
            const data = await response.json();
            if (data.data.length > 0) {
                // Si hay nuevos datos, sobrescribe communities con los nuevos datos
                setCommunities(prevCommunities => [...prevCommunities, ...data.data]);
                setPage(prevPage => prevPage + 1); // Incrementa la página solo si hay datos nuevos
            } else {
                setHasMore(false); // No hay más elementos para cargar
            }
        } catch (error) {
            console.error('Error al obtener datos de la API', error);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0); // Mueve el scroll al inicio de la página
        fetchData(); // Llama a fetchData cuando el componente se monte por primera vez
    }, []);

    useEffect(() => {
        if (page > 1) { // Evitar llamar fetchData en la primera renderización
            fetchData(); // Llama a fetchData cuando page cambie
        }
    }, [page]); // Agrega la dependencia page para que fetchData se llame cada vez que page cambie

    return (
        <>
            <div className='bg-neutral-950 min-h-screen items-center overflow-auto'>
                <Title title={'Explore Communities'} subtitle='Communities' />
                {/* <Search /> */}
                <Filter setCommunities={setCommunities} />
                <InfiniteScroll
                    dataLength={communities.length}
                    next={fetchData} // Llama a fetchData cuando se desplaza hasta el final de la página
                    hasMore={hasMore}
                    loader={<h4>Loading...</h4>}
                    endMessage={<p>No hay más comunidades para cargar.</p>}
                >
                    {!communities ? (
                        <div className="w-full text-center mx-auto text-main">
                            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                                <span className="hidden">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <Communities communities={communities} />
                    )}
                </InfiniteScroll>
            </div>
        </>
    );
}

export default Explore;
