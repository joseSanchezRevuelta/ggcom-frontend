import { useEffect, useState } from 'react';
import CarouselHome from '../../components/CarouselHome/CarouselHome.jsx'
import TitleHome from '../../components/TitleHome/TitleHome.jsx';
import FooterHome from '../../components/FooterHome/FooterHome.jsx';

function Home() {

    const [renderState, setRenderState] = useState(false)

    useEffect(() => {
        console.log("HH")
        window.scrollTo(0, 0); // Mueve el scroll al inicio de la página
        setRenderState(prevState => !prevState)
    }, []);

    return (
        <>
            <div className='bg-neutral-950 min-h-screen flex justify-center items-center bg-[url("/img/w1.jpg")] bg-cover bg-no-repeat bg-center bg-fixed'>
                <div className="sm:flex sm:flex-col items-center">
                    <div className='lg:hidden md:hidden block mt-7'>
                        <TitleHome title={'GGCOM'} subtitle='Videogames Communities' />
                    </div>
                    <CarouselHome renderState={renderState} setRenderState={setRenderState} />
                    <FooterHome />
                </div>
            </div>

        </>
    );
}

export default Home;