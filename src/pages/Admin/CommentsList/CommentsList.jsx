import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Title from '../../../components/Title/Title.jsx'
import ListComments from '../../../componentsAdmin/ListComments/ListComments.jsx';

function CommentsList() {

    const { communityid, userid, email } = useParams();
    const userState = useSelector(state => state.user)

    useEffect(() => {
        window.scrollTo(0, 0); // Mueve el scroll al inicio de la página
    }, []);

    return (
        <>
            <div className='bg-neutral-950 min-h-screen items-center overflow-auto'>
                <Title title={'Comments list'} />
                <ListComments token={userState.userData.token} communityid={communityid} userid={userid} />
            </div>
        </>
    );
}

export default CommentsList;