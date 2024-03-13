const frontUrl = import.meta.env.VITE_URL_FRONT;
const apiUrl = import.meta.env.VITE_URL;

//Login
export async function loginRepository(requestOptions) {
    try {
        const response = await fetch(apiUrl + '/api/login', requestOptions);
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

//Register
export async function registerRepository(requestOptions) {
    try {
        const response = await fetch(apiUrl + '/api/register', requestOptions);
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

//Delete User
export async function deleteUserRepository(token, user_id, password) {
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
                        "id": user_id,
                        "password": password
                    }
                }
            }
        )
    };
    try {
        const response = await fetch(apiUrl + '/api/deleteuser', requestOptions);
        if (response.status === 201) {
            const data = await response.json();
            return data;
        } if (response.status === 200) {
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

export async function deleteUser(token, user_id, password) {
    return await deleteUserRepository(token, user_id, password)
}

//Update Username
export async function updateUsernameRepository(token, user_id, user_name) {
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
    return await updateUsernameRepository(token, user_id, user_email)
    // window.location.href = `${frontUrl}/profile`;
}

//Update Email
export async function updateEmailRepository(token, user_id, user_email) {
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
    return await updateEmailRepository(token, user_id, user_email)
    // window.location.href = `${frontUrl}/profile`;
}

//Update Password
export async function updatePasswordRepository(token, user_id, user_password, new_password, new_password_confirm) {
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
                        "user_password": user_password,
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

export async function updatePassword(token, user_id, user_password, new_password, new_password_confirm) {
    return await updatePasswordRepository(token, user_id, user_password, new_password, new_password_confirm)
    // window.location.href = `${frontUrl}/profile`;
}

//Update Role
export async function updateRoleRepository(token, user_id, user_role) {
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
                        "role": user_role
                    }
                }
            }
        )
    };
    try {
        const response = await fetch(apiUrl + '/api/updateuserrole', requestOptions);
        if (response.ok) {
            const data = await response.json();
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

export async function updateRole(token, user_id, user_role) {
    return await updateRoleRepository(token, user_id, user_role)
    // window.location.href = `${frontUrl}/profile`;
}

//Check User
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

//Get Users
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

//Get Users filter
export async function getUsersFilterRepository(search, order, role) {
    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const response = await fetch(`${apiUrl}/searchusers?search=${search}&order=${order}&role=${role}`, requestOptions);
        const data = await response.json();
        return data;
    } catch (error) {
        // window.location.href = `${frontUrl}/notfound`;
        console.error('Error al obtener datos de la API', error);
    }
}

export async function getUsersFilter(search, order, role) {
    return await getUsersFilterRepository(search, order, role)
}

