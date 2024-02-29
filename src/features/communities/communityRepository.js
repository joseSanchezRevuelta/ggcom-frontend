const frontUrl = import.meta.env.VITE_URL_FRONT;
const apiUrl = import.meta.env.VITE_URL;

export async function createCommunityRepository(requestOptions) {
    try {
        const response = await fetch(apiUrl + '/api/createcommunity', requestOptions);
        if (response.status === 201) {
            const data = await response.json();
            console.log("comunidad creada")
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

export async function createCommunity(requestOptions) {
    const community_created = await createCommunityRepository(requestOptions)
    window.location.href = `${frontUrl}/community/${community_created.id}`;
}

export async function deleteCommunityRepository(token, community_id) {
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
                        "id": community_id
                    }
                }
            }
        )
    };
    try {
        const response = await fetch(apiUrl + '/api/deletecommunity', requestOptions);
        if (response.status === 201) {
            const data = await response.json();
            console.log("comunidad borrada")
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

export async function deleteCommunity(token, community_id) {
    await deleteCommunityRepository(token, community_id)
    window.location.href = `${frontUrl}/explore`;
}