import { useEffect } from 'react';
import Title from '../../../components/Title/Title.jsx'
import { useParams } from 'react-router-dom';
import ListCommunities from '../../../componentsAdmin/ListCommunities/ListCommunities.jsx';

function CommunitiesList() {

    const { id, username, email } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <div className='bg-neutral-950 min-h-screen items-center overflow-auto'>
                <Title title={'Communities list'} />
                <ListCommunities id={id} />
            </div>
        </>
    );
}

export default CommunitiesList;