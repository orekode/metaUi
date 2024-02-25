
import axios from './axios';


export const getDonations = async ({ page }) => {
    try {
        const nav_response = await axios.get(`donations?page=${page}`);
        return nav_response.data.data || nav_response.data;
    } catch(error) {
        return [];
    }
}