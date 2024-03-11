import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import Community from '../Community/Community';
import { useNavigate, useParams } from 'react-router-dom';
import { getCommunity, getEditCommunity } from '../../features/communities/communityRepository';
import Title from '../../components/Title/Title';
import EditCommunityForm from '../../components/EditCommunityForm/EditCommunityForm';
import Footer from '../../components/Footer/Footer';

// eslint-disable-next-line react/prop-types
function EditCommunity() {

    const userState = useSelector(state => state.user)

    const { id } = useParams();

    const [community, setCommunity] = useState([]);

    const navigateTo = useNavigate();

    useEffect(() => {
        console.log(id)
        console.log(userState)
        window.scrollTo(0, 0);
        fetchData()
    }, []);

    const fetchData = async () => {
        try {
            getEditCommunity(userState.userData.token, id)
                .then(response => {
                    console.log(response)
                    // if (userState.userData.id != id) {
                    //     navigateTo('/notfound')
                    // }
                    // console.log(response)
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
                {/* <EditCommunityComponent community_id={id} title={community.title} description={community.description} game_name={community.game_name} country={community.country} language={community.language} timezone={community.timezone}/> */}
                <EditCommunityForm  community_id={id} user_id={userState.userData.id} user_role={userState.userData.role}/>
                <Footer width={'w-full'}/>
            </div>
        </>
    );
}

export default EditCommunity;