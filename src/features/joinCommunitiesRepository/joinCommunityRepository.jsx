const apiUrl = import.meta.env.VITE_URL;

//get joincommunity
export async function getJoinCommunityRepository(token, community_id) {
    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };
        const response = await fetch(`${apiUrl}/getjoincommunity?community_id=${community_id}`, requestOptions);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener datos de la API', error);
    }
}

export async function getJoinCommunity(token, community_id) {
    return getJoinCommunityRepository(token, community_id)
}

// create joincommunity
export async function createJoinCommunityRepository(token, user_id, community_id) {
    try {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(
                {
                    "data": {
                        "attributes": {
                            "user_id": user_id,
                            "community_id": community_id
                        }
                    }
                }
            )
        };
        const response = await fetch(apiUrl + '/api/joincommunity', requestOptions);
        if (response.status === 201) {
            const data = await response.json();
            console.log("Join community")
            return data;
        } else {
            console.error('Response status:', response.status);
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error:', error);
        return error;
    }
}

export async function createJoinCommunity(token, user_id, community_id) {
    const joincommunity_created = await createJoinCommunityRepository(token, user_id, community_id)
    console.log(joincommunity_created)
}

// leave joincommunity
export async function leaveCommunityRepository(token, user_id, community_id) {
    try {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(
                {
                    "data": {
                        "attributes": {
                            "user_id": user_id,
                            "community_id": community_id
                        }
                    }
                }
            )
        };
        const response = await fetch(apiUrl + '/api/leavecommunity', requestOptions);
        if (response.status === 201) {
            const data = await response.json();
            console.log("Leave community")
            return data;
        } else {
            console.error('Response status:', response.status);
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error:', error);
        return error;
    }
}

export async function leaveCommunity(token, user_id, community_id) {
    const community_leaved = await leaveCommunityRepository(token, user_id, community_id)
    console.log(community_leaved)
}