import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Title from '../../../components/Title/Title.jsx'
import ListCommentsUser from '../Admin/ListCommentsUser/ListCommentsUser.jsx';

function CommentsList() {

    const { communityid, userid, email } = useParams();
    const userState = useSelector(state => state.user)

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <div className='bg-neutral-950 min-h-screen items-center overflow-auto'>
                <Title title={'Comments list'} />
                <ListCommentsUser token={userState.userData.token} communityid={communityid} userid={userid} />
            </div>
        </>
    );
}

export default CommentsList;