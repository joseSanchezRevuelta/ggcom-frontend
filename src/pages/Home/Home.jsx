import { useEffect, useState } from 'react';
import TitleHome from '../../components/TitleHome/TitleHome.jsx';
import CarouselHome from '../../components/CarouselHome/CarouselHome.jsx'
import FooterHome from '../../components/FooterHome/FooterHome.jsx';

function Home() {

    const [renderState, setRenderState] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0);
        setRenderState(prevState => !prevState)
    }, []);

    return (
        <>
            <div className='bg-neutral-950 min-h-screen flex justify-center lg:items-center bg-[url("/img/background_phone.jpg")] lg:bg-[url("/img/background_phone.jpg")] lg:bg-[url("/img/w1.jpg")] bg-cover bg-no-repeat bg-center bg-fixed'>
                <div className="sm:flex sm:flex-col items-center">
                    <div className='lg:hidden md:hidden block'>
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