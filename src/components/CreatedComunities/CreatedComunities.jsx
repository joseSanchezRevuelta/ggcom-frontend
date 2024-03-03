import { useEffect, useState } from "react"
import { geMyCreatedCommunities, geMyJointCommunities } from "../../features/communities/communityRepository";
import { useSelector } from "react-redux";
import CommunitySimple from "../CommunitySimple/CommunitySimple";

function CreatedCommunities() {
    useEffect(() => {
        window.scrollTo(0, 0); // Mueve el scroll al inicio de la página
    }, []);

    const userState = useSelector(state => state.user)
    const [createdCommunities, setCreatedCommunities] = useState('')

    useEffect(() => {
        geMyCreatedCommunities(userState.userData.token, userState.userData.id)
            .then(data => {
                console.log(data)
                setCreatedCommunities(data)
            })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
            })
            .finally(() => {
                // setLoadingJoinCommunity(false);
                // setLoadingLeaveCommunity(false);
            });
    }, [userState.userData.token, userState.userData.id])

    return (
        <>
            {!createdCommunities ? (
                <div className="w-full text-center mx-auto text-main">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                        <span className="hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 xs:grid-cols-1 gap-4 lg:w-4/5 md:w-4/5 xs:w-full mx-auto">
                    {createdCommunities.map(community => (
                        <CommunitySimple key={community.id} community={community} />
                    ))}
                </div>
            )}
        </>
    )
}

export default CreatedCommunities