import { redirect } from "react-router-dom";
import axios from "./axios";
import { default as axos } from 'axios';
import Swal from "sweetalert2";

export const isAuthenticated = async () => {

    try {

        const user = await axios.get('user', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('app-token')}`,
            }
        });
        return user;

    } catch (error) {
        return redirect('/login');
    }

}

export const AuthLogin = async (credentials) => {
    try {

        await preCookieFetch();

        const login_attempt = await axios.post('login', credentials, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        if(login_attempt.data.token) localStorage.setItem('app-token', login_attempt.data.token);

        return login_attempt.data;

    } catch (error) {
        return error.response.data;
    }
}

export const AuthLogout = async () => {
    try {

        const logout_attempt = await axios.post('logout', {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('app-token')}`,
            }
        });

        localStorage.removeItem('app-token');

        return logout_attempt.data;

    } catch(error) {
        return error.response.data;
    }
}

export const preCookieFetch = async () => {
    
    try {
        const response = await axos.get('http://localhost:8000/sanctum/csrf-cookie');
    } catch (error) {
        Swal.fire({
            icon: 'warning',
            title: 'System is Unavailable',
            text: 'please try again later'
        });
    }
}