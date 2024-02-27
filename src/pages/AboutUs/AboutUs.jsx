import { useEffect } from 'react';
import Title from '../../components/Title/Title.jsx'

function AboutUs() {
    useEffect(() => {
        window.scrollTo(0, 0); // Mueve el scroll al inicio de la página
      }, []);
      
    return (
        <>
            <div className='bg-neutral-950'>
                <Title title={'GGCOM'} subtitle='Videogames Communities' />
            </div>
        </>
    );
}

export default AboutUs;