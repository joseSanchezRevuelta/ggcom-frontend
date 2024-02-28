import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Communityfull from '../../components/CommunityFull/CommunityFull.jsx'

function Community() {
    const { id } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0); // Mueve el scroll al inicio de la página
      }, []);

    return (
        <>
            <div className='bg-neutral-950 min-h-screen'>
                <Communityfull id={id}/>
            </div>
        </>
    );
}

export default Community;