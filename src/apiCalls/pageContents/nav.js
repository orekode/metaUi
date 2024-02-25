
import axios from '../axios';


export const getNavs = async () => {
    try {
        const nav_response = await axios.get('pageContents?position=Navigation');
        return nav_response.data.data || nav_response.data;

    } catch(error) {
        return [];
    }
}