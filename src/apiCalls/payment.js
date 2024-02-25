import axios from './axios'


export const getSecret = async (details) => {

    try {
        axios.defaults.withCredentials = false;
        const payment_attempt = await axios.post(`pay/oneTime` , details, {
            headers: {
                "Content-Type": "multipart/form-data",
                // "Authorization": `Bearer ${localStorage.getItem('app-token')}`
            }
        });

        return payment_attempt.data;

    } catch (error) {
        console.log(error);
        return {
            icon: 'error',
            title: 'Unable to make payment',
            text: 'please try again later',
        }
    }
}

export const confirmPayment = async (client_sk, payment_method) => {
    try {
        axios.defaults.withCredentials = false;
        const payment_attempt = await axios.post(`pay/confirm` , {client_sk, payment_method}, {
            headers: {
                "Content-Type": "multipart/form-data",
                // "Authorization": `Bearer ${localStorage.getItem('app-token')}`
            }
        });

        return payment_attempt.data;

    } catch (error) {
        console.log(error);
        return {
            icon: 'error',
            title: 'Unable to confirm payment',
            text: 'please try again later',
        }
    }
}