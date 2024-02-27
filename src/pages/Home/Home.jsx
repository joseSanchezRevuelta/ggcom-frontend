import { useEffect } from 'react';
import CarouselHome from '../../components/CarouselHome/CarouselHome.jsx'

function Home() {
    useEffect(() => {
        window.scrollTo(0, 0); // Mueve el scroll al inicio de la página
      }, []);

    return (
        <>
            <div className='bg-neutral-950 min-h-screen'>
                {/* <div className='text-center lg:w-4/5 mx-auto pt-16 bg-red-400'> */}
                    <CarouselHome />
                {/* </div> */}
            </div>
        </>
    );
}

export default Home;