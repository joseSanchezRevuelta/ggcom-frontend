
const apiUrl = import.meta.env.VITE_URL;

export async function loginRepository(requestOptions) {
    try {
        const response = await fetch(apiUrl+'/api/login', requestOptions);
        if (response.status === 200) {
            const data = await response.json();
            return data;
        } else {
            // console.error('Response status:', response.status);
            return null;
        }
    } catch (error) {
        // console.error('Error:', error);
        return null;
    }
}

export async function registerRepository(requestOptions) {
    try {
        const response = await fetch(apiUrl+'/api/register', requestOptions);
        if (response.status === 200) {
            const data = await response.json();
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

export async function deleteUserRepository(token, user_id) {
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
                        "id": user_id
                    }
                }
            }
        )
    };
    try {
        const response = await fetch(apiUrl + '/api/deleteuser', requestOptions);
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

export async function deleteUser(token, user_id) {
    await deleteCommunityRepository(token, community_id)
    window.location.href = `${frontUrl}/explore`;
}
