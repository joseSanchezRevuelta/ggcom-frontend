const apiUrl = import.meta.env.VITE_URL;

export async function getCommentsRepository(community_id) {
    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        };
        const response = await fetch(`${apiUrl}/comments?community_id=${community_id}`, requestOptions);
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

export async function getComments(community_id) {
    return await getCommentsRepository(community_id)
    // window.location.href = `${frontUrl}/community/${community_created.id}`;
}

//create comment
export async function createCommentRepository(token, user_id, community_id, username, comment) {
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
                            "community_id": community_id,
                            "username": username,
                            "comment": comment
                        }
                    }
                }
            )
        };
        const response = await fetch(apiUrl + '/api/createcomment', requestOptions);
        if (response.status === 200) {
            const data = await response.json();
            console.log("comment creado")
            console.log(data)
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

export async function createComent(token, user_id, community_id, username, comment) {
    const community_created = await createCommentRepository(token, user_id, community_id, username, comment)
    // window.location.href = `${frontUrl}/community/${community_created.id}`;
}