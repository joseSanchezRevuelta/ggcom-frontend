import { useEffect } from 'react';
import Title from '../../../components/Title/Title.jsx'
import { useParams } from 'react-router-dom';
import ListCommunities from '../../../componentsAdmin/ListCommunities/ListCommunities.jsx';
import Filter from '../../../components/Filter/Filter.jsx';

function CommunitiesList() {

    const { id, username, email } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0); // Mueve el scroll al inicio de la página
    }, []);

    return (
        <>
            <div className='bg-neutral-950 min-h-screen items-center overflow-auto'>
                <Title title={'Communities list'} />
                <Filter />
                {/* <div className='text-center lg:w-4/5 mx-auto pt-16 bg-red-400'> */}
                <ListCommunities id={id} />
                {/* </div> */}
            </div>
        </>
    );
}

export default CommunitiesList;