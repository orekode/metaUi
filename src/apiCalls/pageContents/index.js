import axios from "../axios";



export const updatePageContent = async (contentMap, id) => {

    try {
        axios.defaults.withCredentials = false;
        const update_attempt = await axios.post(`pageContents/${id}` , contentMap, {
            headers: {
                "Content-Type": "multipart/form-data",
                // "Authorization": `Bearer ${localStorage.getItem('app-token')}`
            },
            params: {
                '_method': 'put'
            }
        });

        return update_attempt.data;

    } catch (error) {
        console.log(error);
        return {
            icon: 'error',
            title: 'Unable make update',
            text: 'please try again later',
        }
    }
}

export const deletePageContent = async ( id) => {

    try {
        console.log(id);
        axios.defaults.withCredentials = false;
        const update_attempt = await axios.post(`pageContents/${id}` , {}, {
            headers: {
                "Content-Type": "multipart/form-data",
                // "Authorization": `Bearer ${localStorage.getItem('app-token')}`
            },
            params: {
                '_method': 'delete'
            }
        });

        return update_attempt.data;

    } catch (error) {
        console.log(error);
        return {
            icon: 'error',
            title: 'Unable make update',
            text: 'please try again later',
        }
    }
}

export const getPageContents = async (position) => {
    try {
        const nav_response = await axios.get(`pageContents?position=${position}`);
        return nav_response.data.data || nav_response.data;

    } catch(error) {
        console.log(error);
        return [];
    }
}