import Title from '../Title/Title.jsx'
import Filter from '../Filter/Filter.jsx'
import Communities from '../Communities/Communities.jsx'
import { useState, useEffect } from 'react';

function Explore() {
    useEffect(() => {
        window.scrollTo(0, 0); // Mueve el scroll al inicio de la página
    }, []);

    const [communities, setCommunities] = useState('')
    // const [communitiesState, setCommunitiesState] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/communities`);
                const data = await response.json();
                setCommunities(data)
            } catch (error) {
                console.error('Error al obtener datos de la API', error);
            }
        };
        fetchData()
    }, [])
    return (
        <>
            <div className='bg-neutral-950 min-h-screen items-center'>
                <Title title={'Explore Communities'} subtitle='Communities' />
                {/* <Search /> */}
                <Filter setCommunities={setCommunities}/>
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