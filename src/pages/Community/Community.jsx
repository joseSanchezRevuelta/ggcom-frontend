import { useEffect } from 'react';
import Communityfull from '../../components/CommunityFull/CommunityFull.jsx'

function Community() {
    useEffect(() => {
        window.scrollTo(0, 0); // Mueve el scroll al inicio de la página
      }, []);

    return (
        <>
            <div className='bg-neutral-950 min-h-screen'>
                <Communityfull />
            </div>
        </>
    );
}

export default Community;