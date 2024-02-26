
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

// export async function loginRepository(requestOptions) {
    
//     fetch(apiUrl+'/api/login', requestOptions)
//     .then(response => {
//         if (response.status === 200) {
//             return response.json();
//         } else {
//             // console.log('Response status:', response.status);
//             // setError("Incorrect user or password")
//             return null;
//         }
//     })
//     .then(data => {
//         if (data) {
//             console.log(data);
//             if (data.success === true) {
//                 // console.log(data);
//             //   window.location.reload();
//             } else {
//                 // console.log(data);
//             //   setError("Incorrect user or password")
//             }
//         } else {
//             console.error('Unexpected response status');
//             return null;
//         }
//     })
//     .catch(error => {
//         console.error('There was a problem with the fetch operation:', error);
//         return null;
//     });

// }
