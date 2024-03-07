const frontUrl = import.meta.env.VITE_URL_FRONT;
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

// delete user
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
            console.log("user borrado")
            return data;
        } if (response.status === 200) {
            const data = await response.json();
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

export async function deleteUser(token, user_id) {
    await deleteUserRepository(token, user_id)
}

//updateUsername
export async function updateUsernameRepository(token, user_id, user_name) {
    console.log(user_name)
    const requestOptions = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(
            {
                "data": {
                    "attributes": {
                        "id": user_id,
                        "username": user_name
                    }
                }
            }
        )
    };
    try {
        const response = await fetch(apiUrl + '/api/updateusername', requestOptions);
        if (response.ok) {
            const data = await response.json();
            console.log("Username actualizado:", data); // Aquí imprimes la respuesta recibida
            return data;
        } else {
            console.error('Error en la respuesta. Estado:', response.status);
            const errorData = await response.json();
            console.error('Detalles del error:', errorData);
            return errorData;
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return error;
    }
    
}

export async function updateUsername(token, user_id, user_email) {
    await updateUsernameRepository(token, user_id, user_email)
    // window.location.href = `${frontUrl}/profile`;
}

//updateEmail
export async function updateEmailRepository(token, user_id, user_email) {
    console.log(user_email)
    const requestOptions = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(
            {
                "data": {
                    "attributes": {
                        "id": user_id,
                        "email": user_email
                    }
                }
            }
        )
    };
    try {
        const response = await fetch(apiUrl + '/api/updateuseremail', requestOptions);
        if (response.ok) {
            const data = await response.json();
            console.log("Email actualizado:", data); // Aquí imprimes la respuesta recibida
            return data;
        } else {
            console.error('Error en la respuesta. Estado:', response.status);
            const errorData = await response.json();
            console.error('Detalles del error:', errorData);
            return errorData;
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return error;
    }
    
}

export async function updateEmail(token, user_id, user_email) {
    await updateEmailRepository(token, user_id, user_email)
    // window.location.href = `${frontUrl}/profile`;
}

//updatePassword
export async function updatePasswordRepository(token, user_id, new_password, new_password_confirm) {
    const requestOptions = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(
            {
                "data": {
                    "attributes": {
                        // "oldpassword": "123123123",
                        "id": user_id,
                        "newpassword": new_password,
                        "newpassword_confirmation": new_password_confirm
                    }
                }
            }
        )
    };
    try {
        const response = await fetch(apiUrl + '/api/updateuserpassword', requestOptions);
        if (response.ok) {
            const data = await response.json();
            console.log("Pass actualizada:", data); // Aquí imprimes la respuesta recibida
            return data;
        } else {
            console.error('Error en la respuesta. Estado:', response.status);
            const errorData = await response.json();
            console.error('Detalles del error:', errorData);
            return errorData;
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return error;
    }
    
}

export async function updatePassword(token, user_id, new_password, new_password_confirm) {
    await updatePasswordRepository(token, user_id, new_password, new_password_confirm)
    // window.location.href = `${frontUrl}/profile`;
}

//checkUser
export async function checkUserRepository(token) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };
    try {
        const response = await fetch(apiUrl + '/checkuser', requestOptions);
        if (response.ok) {
            const data = await response.json();
            // console.log(data); // Aquí imprimes la respuesta recibida
            return data;
        } else {
            console.error('Error en la respuesta. Estado:', response.status);
            const errorData = await response.json();
            console.error('Detalles del error:', errorData);
            return errorData;
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return error;
    }
    
}

export async function checkUser(token) {
    return await checkUserRepository(token)
    // window.location.href = `${frontUrl}/profile`;
}

//updatePassword
export async function getUsersRepository(token, page, limit) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };
    try {
        const response = await fetch(apiUrl + `/getusers?page=${page}&limit=${limit}`, requestOptions);
        if (response.ok) {
            const data = await response.json(); // Aquí imprimes la respuesta recibida
            return data.data;
        } else {
            console.error('Error en la respuesta. Estado:', response.status);
            const errorData = await response.json();
            console.error('Detalles del error:', errorData);
            return errorData;
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return error;
    }
    
}

export async function getUsers(token, page, limit) {
    return await getUsersRepository(token, page, limit)
    // window.location.href = `${frontUrl}/profile`;
}

