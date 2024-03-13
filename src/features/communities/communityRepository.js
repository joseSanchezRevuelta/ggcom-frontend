const frontUrl = import.meta.env.VITE_URL_FRONT;
const apiUrl = import.meta.env.VITE_URL;

//Get Comnunity
export async function getCommunityRepository(community_id) {
    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const response = await fetch(`${apiUrl}/community?community_id=${community_id}`, requestOptions);
        const data = await response.json();
        return data;
        // const gameNames = data.results.map(result => result.name)
        // setCommunityData(gameNames);
    } catch (error) {
        window.location.href = `${frontUrl}/notfound`;
        console.error('Error al obtener datos de la API', error);
    }
}

export async function getCommunity(community_id) {
    return await getCommunityRepository(community_id)
}

//Get EditCommunity
export async function getEditCommunityRepository(token, community_id) {
    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };
        const response = await fetch(`${apiUrl}/geteditcommunity?community_id=${community_id}`, requestOptions);
        const data = await response.json();
        return data;
        // const gameNames = data.results.map(result => result.name)
        // setCommunityData(gameNames);
    } catch (error) {
        // window.location.href = `${frontUrl}/notfound`;
        console.error('Error al obtener datos de la API', error);
    }
}

export async function getEditCommunity(token, community_id) {
    return await getEditCommunityRepository(token, community_id)
}

//Get Comnunities Filter
export async function getCommunitiesFilterRepository(search, game_id, country, language, timezone, order) {
    let signTimezone = ''
    if (timezone.includes('+')) {
        signTimezone = 'mas'
    } else if (timezone.includes('-')) {
        signTimezone = 'menos'
    }
    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const response = await fetch(`${apiUrl}/searchcommunities?search=${search}&game_id=${game_id}&country=${country}&language=${language}&timezone=${timezone}&signtimezone=${signTimezone}&order=${order}`, requestOptions);
        const data = await response.json();
        return data;
    } catch (error) {
        window.location.href = `${frontUrl}/notfound`;
        console.error('Error al obtener datos de la API', error);
    }
}

export async function getCommunitiesFilter(search, game_id, country, language, timezone, order) {
    return await getCommunitiesFilterRepository(search, game_id, country, language, timezone, order)
}

//Get JoinComnunities
export async function getMyJoinCommunitiesRepository(token) {
    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };
        const response = await fetch(`${apiUrl}/myjoincommunities`, requestOptions);
        const data = await response.json();
        return data;
        // const gameNames = data.results.map(result => result.name)
        // setCommunityData(gameNames);
    } catch (error) {
        // window.location.href = `${frontUrl}/notfound`;
        console.error('Error al obtener datos de la API', error);
    }
}

export async function geMyJointCommunities(token) {
    return await getMyJoinCommunitiesRepository(token)
}

//Get CreatedComnunities
export async function getMyCreatedCommunitiesRepository(token, user_id) {
    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };
        const response = await fetch(`${apiUrl}/mycreatedcommunities?user_id=${user_id}`, requestOptions);
        const data = await response.json();
        return data;
        // const gameNames = data.results.map(result => result.name)
        // setCommunityData(gameNames);
    } catch (error) {
        // window.location.href = `${frontUrl}/notfound`;
        console.error('Error al obtener datos de la API', error);
    }
}

export async function geMyCreatedCommunities(token, user_id) {
    return await getMyCreatedCommunitiesRepository(token, user_id)
}

//Create Comnunity
export async function createCommunityRepository(requestOptions) {
    console.log(apiUrl)
    try {
        // const response = await fetch(apiUrl + '/api/createcommunity', requestOptions);
        const response = await fetch('https://ggcom-backend-production.up.railway.app/api/createcommunity', requestOptions);

        if (response.status === 201) {
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

export async function createCommunity(requestOptions) {
    return await createCommunityRepository(requestOptions)
    // window.location.href = `${frontUrl}/community/${community_created.id}`;
}

//Update Comnunity
export async function updateCommunityRepository(requestOptions) {
    try {
        const response = await fetch(apiUrl + '/api/updatecommunity', requestOptions);
        if (response.status === 201) {
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

export async function updateCommunity(requestOptions) {
    return await updateCommunityRepository(requestOptions)
    // window.location.href = `${frontUrl}/community/${community_created.id}`;
}

//Update Title
export async function updateTitleCommunityRepository(token, community_id, community_title) {
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
                        "community_id": community_id,
                        "title_new": community_title
                    }
                }
            }
        )
    };
    try {
        const response = await fetch(apiUrl + '/api/updatetitlecommunity', requestOptions);
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

export async function updateTitleCommunity(token, community_id, community_title) {
    const community_created = await updateTitleCommunityRepository(token, community_id, community_title)
    // window.location.href = `${frontUrl}/community/${community_created.id}`;
}

//Update Description
export async function updateDescriptionCommunityRepository(token, community_id, community_description) {
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
                        "community_id": community_id,
                        "description_new": community_description
                    }
                }
            }
        )
    };
    try {
        const response = await fetch(apiUrl + '/api/updatedescriptioncommunity', requestOptions);
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

export async function updateDescriptionCommunity(token, community_id, community_description) {
    const community_created = await updateDescriptionCommunityRepository(token, community_id, community_description)
    // window.location.href = `${frontUrl}/community/${community_created.id}`;
}

//Update Country
export async function updateCountryCommunityRepository(token, community_id, community_country) {
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
                        "community_id": community_id,
                        "country_new": community_country
                    }
                }
            }
        )
    };
    try {
        const response = await fetch(apiUrl + '/api/updatecountrycommunity', requestOptions);
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

export async function updateCountryCommunity(token, community_id, community_country) {
    const community_created = await updateCountryCommunityRepository(token, community_id, community_country)
    // window.location.href = `${frontUrl}/community/${community_created.id}`;
}

//Update Language
export async function updateLanguageCommunityRepository(token, community_id, community_language) {
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
                        "community_id": community_id,
                        "language_new": community_language
                    }
                }
            }
        )
    };
    try {
        const response = await fetch(apiUrl + '/api/updatelanguagecommunity', requestOptions);
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

export async function updateLaguageCommunity(token, community_id, community_language) {
    const community_created = await updateLanguageCommunityRepository(token, community_id, community_language)
    // window.location.href = `${frontUrl}/community/${community_created.id}`;
}

// delete comnunity
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
    // window.location.href = `${frontUrl}/explore`;
}