const apiUrl = import.meta.env.VITE_URL;

export async function getCommentsRepository(token, community_id, userid, page, limit) {
    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };
        const response = await fetch(`${apiUrl}/comments?community_id=${community_id}&user_id=${userid}&page=${page}&limit=${limit}`, requestOptions);
        if (response.status === 200) {
            const data = await response.json();
            return data.data;
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

export async function getComments(token, community_id, userid, page, limit) {
    return await getCommentsRepository(token, community_id,userid, page, limit)
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

//delete comment
export async function deleteCommentRepository(token, user_id, community_id, comment_id) {
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
                            "id": comment_id,
                            "user_id": user_id,
                            "community_id": community_id
                        }
                    }
                }
            )
        };
        const response = await fetch(apiUrl + '/api/deletecomment', requestOptions);
        if (response.status === 200) {
            const data = await response.json();
            console.log("comment borrado")
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

export async function deleteComent(token, user_id, community_id, comment_id) {
    const community_created = await deleteCommentRepository(token, user_id, community_id, comment_id)
    // window.location.href = `${frontUrl}/community/${community_created.id}`;
}