import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getEditCommunity } from '../../features/communities/communityRepository';
import Title from '../../components/Title/Title';
import EditCommunityForm from '../../components/EditCommunityForm/EditCommunityForm';
import Footer from '../../components/Footer/Footer';

// eslint-disable-next-line react/prop-types
function EditCommunity() {

    const { id } = useParams();

    const userState = useSelector(state => state.user)

    const [community, setCommunity] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchData()
    }, []);

    const fetchData = async () => {
        try {
            getEditCommunity(userState.userData.token, id)
                .then(response => {
                    setCommunity(response)
                })
                .catch(error => {
                    console.log(error)
                })
        } catch (error) {
            console.error('Error al obtener datos de la API', error);
        }
    };

    return (
        <>
            <div className='bg-neutral-950 min-h-screen'>
                <Title title={'Edit community'} subtitle='' />
                <EditCommunityForm community_id={id} user_id={userState.userData.id} user_role={userState.userData.role} />
                <Footer width={'w-full'} />
            </div>
        </>
    );
}

export default EditCommunity;