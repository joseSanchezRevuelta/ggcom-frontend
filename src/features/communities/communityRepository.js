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