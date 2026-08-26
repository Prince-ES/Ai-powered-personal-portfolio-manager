import axios from 'axios';
import { getAccessToken } from './auth';

export const api = axios.create({
    baseURL:'http://localhost:5000/api',
    timeout: 10000
});

let accessToken = null;

export function setNewAccessToken(token){
    accessToken = token
}

api.interceptors.request.use((config)=>{
    if(accessToken){
        config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config;
})

api.interceptors.response.use(
    response => {
        return response
    },
    async (error) => {
        const originalRequest = error.config;

       
        if(error.response?.status === 401 && !originalRequest._retry){
            originalRequest._retry = true;
            console.log('Access token expired. Attempting to refresh token...');

            try{
            const response = await getAccessToken();
            const newAccessToken = response.data.accessToken;

            if(newAccessToken){
                setNewAccessToken(newAccessToken);
            }

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
            return api(originalRequest);
        
            }catch(refreshError){
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }

)