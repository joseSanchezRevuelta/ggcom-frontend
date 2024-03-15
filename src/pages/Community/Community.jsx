import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Communityfull from '../../components/CommunityFull/CommunityFull.jsx'

function Community() {

    const { id } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <div className='bg-neutral-950 min-h-screen bg-[url("/img/background_phone.jpg")] lg:bg-[url("/img/w1.jpg")] bg-cover bg-no-repeat bg-center bg-fixed flex flex-col'>
                <Communityfull id={id} />
            </div>
        </>
    );
}

export default Community;